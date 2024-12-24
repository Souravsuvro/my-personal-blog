# Tawk.to Chat Integration Guide

## Setup Instructions

1. **Create a Tawk.to Account**
   - Go to [Tawk.to](https://www.tawk.to/)
   - Sign up for a free account
   - Create a new property for your portfolio website

2. **Get Your Widget Code**
   - After creating a property, Tawk.to will provide you with a unique script
   - Replace `YOUR_PROPERTY_ID` and `YOUR_WIDGET_ID` in `src/components/TawkToChat.tsx` with your actual IDs

3. **Customization Options**
   - Modify the `setAttributes` method in `TawkToChat.tsx` to customize visitor information
   - Adjust widget appearance in Tawk.to dashboard

## Troubleshooting
- Ensure your Tawk.to script is correctly loaded
- Check browser console for any errors
- Verify widget visibility in different environments

## Performance Considerations
- The chat widget is lazily loaded to minimize initial page load impact
- Cleanup function ensures proper resource management

## Privacy and Compliance
- Inform users about the chat integration in your privacy policy
- Ensure GDPR and other local data protection regulations are followed

## Recommended Next Steps
- Test the chat widget thoroughly
- Monitor performance and user interactions
- Customize widget styling to match your portfolio's design
