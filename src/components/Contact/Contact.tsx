import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter, FaPaperPlane } from 'react-icons/fa';
import type { ContactForm } from '@/types';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const ContactSection = styled.section`
  position: relative;
  padding: 120px 0;
  background: ${({ theme }) => theme.colors.background};
  overflow: hidden;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.1;
    z-index: 0;
  }

  &::before {
    background: ${({ theme }) => theme.colors.primary};
    top: -100px;
    left: -100px;
  }

  &::after {
    background: ${({ theme }) => theme.colors.secondary};
    bottom: -100px;
    right: -100px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 1;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 60px;
  align-items: center;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ContactInfo = styled(motion.div)`
  text-align: center;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    text-align: left;
  }
`;

const Title = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  margin-bottom: 24px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 48px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-left: 0;
  }
`;

const ContactDetails = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 48px;
`;

const ContactItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 12px;
  background: ${({ theme }) => `${theme.colors.primary}10`};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateX(8px);
  }

  svg {
    font-size: 24px;
    color: ${({ theme }) => theme.colors.primary};
  }

  .content {
    h4 {
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 4px;
    }

    p {
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 16px;
  justify-content: center;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: flex-start;
  }
`;

const SocialLink = styled(motion.a)`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 20px;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-4px);
  }
`;

const FormWrapper = styled(motion.div)`
  background: ${({ theme }) => theme.colors.card};
  padding: 40px;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 4px ${({ theme }) => `${theme.colors.primary}20`};
  }
`;

const TextArea = styled(Input).attrs({ as: 'textarea' })`
  min-height: 150px;
  resize: vertical;
`;

const SubmitButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px ${({ theme }) => `${theme.colors.primary}40`};
  }

  svg {
    font-size: 20px;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Message = styled(motion.div)<{ $type: 'success' | 'error' }>`
  margin-top: 16px;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  background: ${({ theme, $type }) =>
    $type === 'success'
      ? `${theme.colors.success}15`
      : `${theme.colors.error}15`};
  color: ${({ theme, $type }) =>
    $type === 'success'
      ? theme.colors.success
      : theme.colors.error};
`;

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const templateParams = {
        from_name: form.name,
        from_email: form.email,
        subject: form.subject,
        message: form.message,
        to_name: 'Your Name',
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setSuccess(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <ContactSection id="contact">
      <Container>
        <ContentWrapper>
          <ContactInfo
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <Title variants={itemVariants}>
              Let's Work Together
            </Title>
            <Description variants={itemVariants}>
              Have a project in mind? Let's discuss how we can bring your ideas to life.
            </Description>

            <ContactDetails>
              <ContactItem variants={itemVariants}>
                <FaMapMarkerAlt />
                <div className="content">
                  <h4>Location</h4>
                  <p>San Francisco Bay Area, CA</p>
                </div>
              </ContactItem>

              <ContactItem variants={itemVariants}>
                <FaEnvelope />
                <div className="content">
                  <h4>Email</h4>
                  <p>hello@yourdomain.com</p>
                </div>
              </ContactItem>

              <ContactItem variants={itemVariants}>
                <FaPhone />
                <div className="content">
                  <h4>Phone</h4>
                  <p>+1 (555) 123-4567</p>
                </div>
              </ContactItem>
            </ContactDetails>

            <SocialLinks variants={itemVariants}>
              <SocialLink
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaLinkedin />
              </SocialLink>
              <SocialLink
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub />
              </SocialLink>
              <SocialLink
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTwitter />
              </SocialLink>
            </SocialLinks>
          </ContactInfo>

          <FormWrapper
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <Form ref={formRef} onSubmit={handleSubmit}>
              <InputGroup>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </InputGroup>

              <InputGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </InputGroup>

              <InputGroup>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
              </InputGroup>

              <InputGroup>
                <Label htmlFor="message">Message</Label>
                <TextArea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </InputGroup>

              <SubmitButton
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? 'Sending...' : 'Send Message'}
                <FaPaperPlane />
              </SubmitButton>

              {success && (
                <Message
                  $type="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Message sent successfully! I'll get back to you soon.
                </Message>
              )}

              {error && (
                <Message
                  $type="error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </Message>
              )}
            </Form>
          </FormWrapper>
        </ContentWrapper>
      </Container>
    </ContactSection>
  );
};

export default Contact;
