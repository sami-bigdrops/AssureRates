import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { fullName, email, subject, message, subid1, subid2, subid3, trustedformCertUrl } = body

    // Validate required fields
    if (!fullName || !email || !subject || !message) {
      const missingFields = [];
      if (!fullName) missingFields.push('fullName');
      if (!email) missingFields.push('email');
      if (!subject) missingFields.push('subject');
      if (!message) missingFields.push('message');
      
      return NextResponse.json(
        { error: 'All fields are required', missingFields },
        { status: 400 }
      )
    }

    // Get client IP address
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'

    // Validate required environment variables
    if (!process.env.LEADPROSPER_CAMPAIGN_ID || !process.env.LEADPROSPER_SUPPLIER_ID || !process.env.LEADPROSPER_API_KEY || !process.env.LEADPROSPER_API_URL) {
      const missingVars = [];
      if (!process.env.LEADPROSPER_CAMPAIGN_ID) missingVars.push('LEADPROSPER_CAMPAIGN_ID');
      if (!process.env.LEADPROSPER_SUPPLIER_ID) missingVars.push('LEADPROSPER_SUPPLIER_ID');
      if (!process.env.LEADPROSPER_API_KEY) missingVars.push('LEADPROSPER_API_KEY');
      if (!process.env.LEADPROSPER_API_URL) missingVars.push('LEADPROSPER_API_URL');
      
      return NextResponse.json(
        { 
          error: 'Server configuration error. Please contact support.',
          details: `Missing: ${missingVars.join(', ')}`
        },
        { status: 500 }
      );
    }

    // Split fullName into firstName and lastName for LeadProsper
    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Prepare the data for LeadProsper
    const formData = {
      lp_campaign_id: process.env.LEADPROSPER_CAMPAIGN_ID,
      lp_supplier_id: process.env.LEADPROSPER_SUPPLIER_ID,
      lp_key: process.env.LEADPROSPER_API_KEY,
      lp_subid1: subid1 || '',
      lp_subid2: subid2 || '',
      lp_subid3: subid3 || '',
      first_name: firstName,
      last_name: lastName,
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      ip_address: ip,
      user_agent: request.headers.get('user-agent') || '',
      landing_page_url: request.headers.get('referer') || '',
      trustedform_cert_url: trustedformCertUrl || '',
    };

    // Log form submission for monitoring (development only)
    if (process.env.NODE_ENV === 'development') {
      console.log('[LeadProsper] Sending data to:', process.env.LEADPROSPER_API_URL);
      console.log('[LeadProsper] Field names:', Object.keys(formData));
      console.log('[LeadProsper] Payload (sensitive data redacted):', {
        ...formData,
        lp_key: '***REDACTED***',
        lp_campaign_id: formData.lp_campaign_id ? '***SET***' : '***MISSING***',
        lp_supplier_id: formData.lp_supplier_id ? '***SET***' : '***MISSING***',
      });
    }

    // Send to LeadProsper
    const API_URL = process.env.LEADPROSPER_API_URL!;
    let leadProsperResponse;
    let rawResponse;
    let result;

    try {
      leadProsperResponse = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      // Get the raw response text
      rawResponse = await leadProsperResponse.text();

      // Check HTTP status
      if (!leadProsperResponse.ok) {
        if (process.env.NODE_ENV === 'development') {
          console.error('[LeadProsper] HTTP Error:', leadProsperResponse.status, rawResponse);
        }
        return NextResponse.json(
          { 
            error: 'LeadProsper API returned an error',
            details: process.env.NODE_ENV === 'development' 
              ? `Status: ${leadProsperResponse.status}, Response: ${rawResponse}`
              : 'Please check your LeadProsper configuration'
          },
          { status: leadProsperResponse.status }
        );
      }

      // Try to parse as JSON
      try {
        result = JSON.parse(rawResponse);
      } catch {
        // If parsing fails, log the raw response for debugging
        if (process.env.NODE_ENV === 'development') {
          console.warn('[LeadProsper] Non-JSON response:', rawResponse);
        }
        // Even if parsing fails, we'll treat it as success
        result = { status: 'ACCEPTED' };
      }

      if (process.env.NODE_ENV === 'development') {
        console.log('[LeadProsper] Response Status:', leadProsperResponse.status);
        console.log('[LeadProsper] Response:', result);
      }
    } catch (fetchError) {
      // Network or fetch errors
      if (process.env.NODE_ENV === 'development') {
        console.error('[LeadProsper] Fetch error:', fetchError);
      }
      return NextResponse.json(
        { 
          error: 'Failed to connect to LeadProsper API',
          details: process.env.NODE_ENV === 'development' 
            ? (fetchError instanceof Error ? fetchError.message : 'Unknown error')
            : 'Please check your API URL configuration'
        },
        { status: 500 }
      );
    }

    if (result.status === 'ACCEPTED' || result.status === 'DUPLICATED' || result.status === 'ERROR') {
      // Generate unique access token for thank you page
      const accessToken = crypto.randomUUID();
      const expiresAt = Date.now() + (10 * 60 * 1000); // Token expires in 10 minutes
      
      const successResponse = { 
        success: true, 
        message: 'Form submitted successfully',
        redirectUrl: "/thankyou",
        leadProsperStatus: result.status,
        accessToken,
        expiresAt
      };
      
      // Set secure cookie for additional validation
      const nextResponse = NextResponse.json(successResponse, { status: 200 });
      nextResponse.cookies.set('thankyou_access', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 10 * 60 // 10 minutes
      });
      
      return nextResponse;
    } else {
      const errorResponse = { 
        success: false, 
        error: 'Lead submission failed',
        leadProsperStatus: result.status
      };
      return NextResponse.json(errorResponse, { status: 400 })
    }
  } catch (error) {
    // Log unexpected errors
    if (process.env.NODE_ENV === 'development') {
      console.error('[LeadProsper] Unexpected error:', error);
    }
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' 
          ? (error instanceof Error ? error.message : 'Unknown error')
          : undefined
      },
      { status: 500 }
    )
  }
}
