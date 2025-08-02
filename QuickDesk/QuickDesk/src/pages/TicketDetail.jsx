
import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  Badge,
  Container,
  VStack,
  Spinner,
  Alert,
  AlertIcon,
  Button,
  Flex,
  Textarea,
  FormControl,
  useToast,
  Divider,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function TicketDetail() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    fetchTicketDetails();
  }, [id]);

  const fetchTicketDetails = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/tickets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTicket(response.data);
    } catch (err) {
      setError('Failed to load ticket details.');
      toast({
        title: 'Error loading ticket.',
        description: err.response?.data?.message || 'Please try again.',
        status: 'error',
      });
      if (err.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      await axios.put(
        `http://localhost:5000/api/tickets/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast({
        title: `Ticket status updated to ${newStatus}.`,
        status: 'success',
      });
      fetchTicketDetails(); // Re-fetch the ticket to get the latest status
    } catch (err) {
      toast({
        title: 'Failed to update status.',
        description: err.response?.data?.message || 'Permission denied.',
        status: 'error',
      });
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token || !newComment.trim()) return;

    try {
      await axios.post(
        `http://localhost:5000/api/tickets/${id}/comments`,
        { text: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewComment('');
      toast({
        title: 'Comment added.',
        status: 'success',
      });
      fetchTicketDetails(); // Re-fetch to show the new comment
    } catch (err) {
      toast({
        title: 'Failed to add comment.',
        description: err.response?.data?.message || 'Please try again.',
        status: 'error',
      });
    }
  };

  if (loading) {
    return (
      <Box p={5} textAlign="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error || !ticket) {
    return (
      <Box p={5}>
        <Alert status="error">
          <AlertIcon />
          {error || 'Ticket not found.'}
        </Alert>
      </Box>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open':
        return 'red';
      case 'In Progress':
        return 'yellow';
      case 'Resolved':
        return 'green';
      default:
        return 'gray';
    }
  };

  return (
    <Box>
      <Navbar />
      <Container maxW="container.lg" py={10}>
        <Flex justifyContent="space-between" alignItems="center" mb={6}>
          <Heading>{ticket.subject}</Heading>
          <Badge colorScheme={getStatusColor(ticket.status)} fontSize="md" p={2}>
            {ticket.status}
          </Badge>
        </Flex>

        {/* This is a simple example for an Agent. You'd need a more robust way to check user role */}
        {ticket.status === 'Open' && (
          <Button colorScheme="green" onClick={() => handleStatusUpdate('In Progress')} mb={4}>
            Take Ticket
          </Button>
        )}
        {ticket.status === 'In Progress' && (
          <Button colorScheme="green" onClick={() => handleStatusUpdate('Resolved')} mb={4}>
            Resolve Ticket
          </Button>
        )}

        <Box p={6} borderWidth={1} borderRadius="lg" bg="white" mb={6}>
          <Text fontSize="lg" fontWeight="bold">
            Description
          </Text>
          <Text mt={2}>{ticket.description}</Text>
          <Divider my={4} />
          <Text fontSize="sm" color="gray.500">
            **Created by:** {ticket.createdBy.name}
          </Text>
          <Text fontSize="sm" color="gray.500">
            **Category:** {ticket.category.name}
          </Text>
          <Text fontSize="sm" color="gray.500">
            **Submitted on:** {new Date(ticket.createdAt).toLocaleString()}
          </Text>
        </Box>

        <VStack spacing={4} align="stretch">
          <Heading size="md">Comments</Heading>
          {ticket.comments.map((comment, index) => (
            <Box key={index} p={4} borderWidth={1} borderRadius="lg" bg="gray.50">
              <Text fontWeight="bold">{comment.user.name}</Text>
              <Text fontSize="sm" color="gray.500">
                {new Date(comment.createdAt).toLocaleString()}
              </Text>
              <Text mt={2}>{comment.text}</Text>
            </Box>
          ))}
          <Box as="form" onSubmit={handleCommentSubmit}>
            <FormControl>
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </FormControl>
            <Button mt={2} colorScheme="blue" type="submit">
              Post Comment
            </Button>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}

export default TicketDetail;