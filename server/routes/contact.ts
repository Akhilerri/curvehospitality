import { Router } from 'express';
import { z } from 'zod';
import { contactFormSubmissionSchema, contactInformationResponseSchema } from '../../shared/validation/contact';
import { ContactSubmission, ContactInformation } from '../../shared/types/contact';
import { mockContactInformation } from '../data/mockContact';

const router = Router();

// Mock database for contact submissions
const contactSubmissions: ContactSubmission[] = [];

// Get contact information
router.get('/info', async (req, res) => {
  try {
    const contactInfo: ContactInformation = mockContactInformation;
    
    res.json({
      contactInfo
    });
  } catch (error) {
    console.error('Error fetching contact information:', error);
    res.status(500).json({ 
      error: 'Failed to fetch contact information' 
    });
  }
});

// Submit contact form
router.post('/submit', async (req, res) => {
  try {
    // Validate request body
    const validatedData = contactFormSubmissionSchema.parse({
      ...req.body,
      companyId: 'company-1' // Default company ID for now
    });

    // Create contact submission
    const submission: ContactSubmission = {
      id: `contact-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      companyId: validatedData.companyId,
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      projectType: validatedData.projectType,
      message: validatedData.message,
      submittedAt: new Date(),
      status: 'new',
      source: 'website_form',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Store submission (in real app, this would go to database)
    contactSubmissions.push(submission);

    // Send email notification (mock implementation)
    await sendEmailNotification(submission);

    // Send auto-reply to customer (mock implementation)
    await sendAutoReply(submission);

    res.status(201).json({
      submission: {
        id: submission.id,
        status: submission.status,
        submittedAt: submission.submittedAt
      },
      message: 'Contact form submitted successfully'
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.errors
      });
    }

    console.error('Error submitting contact form:', error);
    res.status(500).json({
      error: 'Failed to submit contact form'
    });
  }
});

// Get contact submissions (admin endpoint)
router.get('/submissions', async (req, res) => {
  try {
    const { status, limit = 50, offset = 0 } = req.query;
    
    let filteredSubmissions = contactSubmissions;
    
    if (status) {
      filteredSubmissions = contactSubmissions.filter(s => s.status === status);
    }
    
    const paginatedSubmissions = filteredSubmissions
      .slice(Number(offset), Number(offset) + Number(limit))
      .sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());

    res.json({
      submissions: paginatedSubmissions,
      total: filteredSubmissions.length,
      limit: Number(limit),
      offset: Number(offset)
    });

  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    res.status(500).json({
      error: 'Failed to fetch contact submissions'
    });
  }
});

// Update contact submission status (admin endpoint)
router.patch('/submissions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, priority, assignedTo, notes } = req.body;

    const submissionIndex = contactSubmissions.findIndex(s => s.id === id);
    
    if (submissionIndex === -1) {
      return res.status(404).json({
        error: 'Contact submission not found'
      });
    }

    // Update submission
    const submission = contactSubmissions[submissionIndex];
    if (status) submission.status = status;
    if (priority) submission.priority = priority;
    if (assignedTo) submission.assignedTo = assignedTo;
    if (notes) {
      submission.notes = submission.notes || [];
      submission.notes.push({
        id: `note-${Date.now()}`,
        content: notes,
        createdBy: 'admin', // In real app, get from auth
        createdAt: new Date(),
        isInternal: true
      });
    }
    submission.updatedAt = new Date();

    contactSubmissions[submissionIndex] = submission;

    res.json({
      submission,
      message: 'Contact submission updated successfully'
    });

  } catch (error) {
    console.error('Error updating contact submission:', error);
    res.status(500).json({
      error: 'Failed to update contact submission'
    });
  }
});

// Mock email notification function
async function sendEmailNotification(submission: ContactSubmission): Promise<void> {
  // In a real application, this would integrate with an email service like:
  // - SendGrid
  // - AWS SES
  // - Mailgun
  // - Nodemailer with SMTP
  
  console.log('📧 Email notification sent to admin:', {
    to: 'admin@curveredo.com',
    subject: `New Contact Form Submission from ${submission.name}`,
    body: `
      New contact form submission received:
      
      Name: ${submission.name}
      Email: ${submission.email}
      Phone: ${submission.phone || 'Not provided'}
      Project Type: ${submission.projectType || 'Not specified'}
      
      Message:
      ${submission.message}
      
      Submitted at: ${submission.submittedAt.toLocaleString()}
      Submission ID: ${submission.id}
    `
  });
}

// Mock auto-reply function
async function sendAutoReply(submission: ContactSubmission): Promise<void> {
  console.log('📧 Auto-reply sent to customer:', {
    to: submission.email,
    subject: 'Thank you for contacting CurveRedo Design & Manufacturing',
    body: `
      Dear ${submission.name},
      
      Thank you for reaching out to us! We've received your inquiry and will get back to you within 24 hours during business days.
      
      Your submission details:
      - Submission ID: ${submission.id}
      - Submitted: ${submission.submittedAt.toLocaleString()}
      
      In the meantime, feel free to explore our portfolio and services on our website.
      
      Best regards,
      The CurveRedo Team
      
      ---
      CurveRedo Design & Manufacturing
      Phone: (555) 123-4567
      Email: info@curveredo.com
      Website: www.curveredo.com
    `
  });
}

export default router;