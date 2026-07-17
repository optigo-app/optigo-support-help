import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Rating,
  Chip,
  Divider,
  Grid,
  Card,
  CardContent,
  Avatar,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  StarRateRounded as StarRateRoundedIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Assignment as AssignmentIcon,
  Payment as PaymentIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(1.5),
  background: theme.palette.mode === "dark" ? "#1f1f1f" : "#ffffff",
  boxShadow: "0px 2px 8px rgba(0,0,0,0.06)",
  border: `1px solid ${theme.palette.divider}`,
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 4px 16px rgba(0,0,0,0.1)"
  }
}));

const InfoCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  boxShadow: "0px 1px 3px rgba(0,0,0,0.04)",
  border: `1px solid ${theme.palette.divider}`,
  transition: "all 0.2s ease",
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
  }
}));

const StatusChip = ({ status, type = "default" }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return { color: '#ED6C02', bg: '#FFF4E6' };
      case 'approved': return { color: '#2E7D32', bg: '#E8F5E8' };
      case 'completed': return { color: '#1976D2', bg: '#E3F2FD' };
      case 'paid': return { color: '#2E7D32', bg: '#E8F5E8' };
      case 'unpaid': return { color: '#D32F2F', bg: '#FFEBEE' };
      default: return { color: '#666', bg: '#F5F5F5' };
    }
  };

  const { color, bg } = getStatusColor(status);
  
  return (
    <Chip
      label={status || 'N/A'}
      size="small"
      sx={{
        backgroundColor: bg,
        color: color,
        fontWeight: 500,
        fontSize: '0.75rem',
        height: '24px'
      }}
    />
  );
};

const FeedbackDisplay = ({ ratingValue, ratingDescription, ratingBy }) => {
  if (!ratingValue) return null;

  return (
    <InfoCard>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <StarRateRoundedIcon fontSize="small" color="primary" />
          <Typography variant="subtitle2" fontWeight="600">
            Customer Feedback
          </Typography>
        </Box>
        
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
          <Rating
            value={ratingValue}
            readOnly
            size="small"
            icon={<StarRateRoundedIcon fontSize="small" />}
            emptyIcon={<StarRateRoundedIcon fontSize="small" />}
            sx={{
              color: "#FFC107",
              "& .MuiRating-iconEmpty": {
                color: "#E0E0E0",
              },
            }}
          />
        </Box>

        {ratingDescription && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ 
              fontStyle: "italic",
              fontSize: '0.875rem',
              lineHeight: 1.4,
              mb: 1
            }}
          >
            "{ratingDescription}"
          </Typography>
        )}

        {ratingBy && (
          <Typography
            variant="caption"
            color="text.disabled"
            sx={{ fontSize: '0.75rem' }}
          >
            — {ratingBy}
          </Typography>
        )}
      </CardContent>
    </InfoCard>
  );
};

const TicketDisplay = ({ ticketData }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const parseAssignments = (assignmentsString) => {
    try {
      return JSON.parse(assignmentsString || '[]');
    } catch {
      return [];
    }
  };

  const assignments = parseAssignments(ticketData.Assignments);

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
      {/* Header Section */}
      <StyledPaper sx={{ mb: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box>
            <Typography variant="h5" fontWeight="600" color="primary" gutterBottom>
              {ticketData.Topic}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ticket #{ticketData.TicketNo} • Order #{ticketData.OrderNo}
            </Typography>
          </Box>
          <Box display="flex" gap={1} flexWrap="wrap">
            <StatusChip status={ticketData.Status} />
            <StatusChip status={ticketData.ApprovedStatus} />
            <StatusChip status={ticketData.PaymentStatus} />
          </Box>
        </Box>

        {ticketData.Description && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              {ticketData.Description}
            </Typography>
          </Box>
        )}
      </StyledPaper>

      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          {/* Basic Information */}
          <InfoCard sx={{ mb: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <AssignmentIcon fontSize="small" color="primary" />
                <Typography variant="h6" fontWeight="600">
                  Ticket Details
                </Typography>
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Client Code
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    {ticketData.ClientCode}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Topic Type
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    {ticketData.TopicType || 'N/A'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Service Type
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    {ticketData.ServiceType || 'Not specified'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    On Demand
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    {ticketData.OnDemand === 'yes' ? 'Yes' : 'No'}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </InfoCard>

          {/* Timeline */}
          <InfoCard sx={{ mb: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <CalendarIcon fontSize="small" color="primary" />
                <Typography variant="h6" fontWeight="600">
                  Timeline
                </Typography>
              </Box>
              
              <Stack spacing={2}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Created
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    {formatDate(ticketData.Date)}
                  </Typography>
                </Box>
                <Divider />
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Ticket Date
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    {formatDate(ticketData.TicketDate)}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Request Date
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    {formatDate(ticketData.RequestDate)}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Last Updated
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    {formatDate(ticketData.UpdatedAt)}
                  </Typography>
                </Box>
                {ticketData.DeliveryDate && (
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                      Delivery Date
                    </Typography>
                    <Typography variant="body2" fontWeight="500">
                      {formatDate(ticketData.DeliveryDate)}
                    </Typography>
                  </Box>
                )}
              </Stack>
            </CardContent>
          </InfoCard>

          {/* Assignments */}
          {assignments.length > 0 && (
            <InfoCard>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <PersonIcon fontSize="small" color="primary" />
                  <Typography variant="h6" fontWeight="600">
                    Assignments
                  </Typography>
                </Box>
                
                <Stack spacing={2}>
                  {assignments.map((assignment, index) => (
                    <Box key={index} display="flex" alignItems="center" gap={2}>
                      <Avatar sx={{ width: 32, height: 32, fontSize: '0.875rem' }}>
                        {assignment.user?.charAt(0)?.toUpperCase()}
                      </Avatar>
                      <Box flex={1}>
                        <Typography variant="body2" fontWeight="500">
                          {assignment.user}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {assignment.Department} • {assignment.EstimatedHours}h estimated
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </InfoCard>
          )}
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={4}>
          {/* Payment Information */}
          <InfoCard sx={{ mb: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <PaymentIcon fontSize="small" color="primary" />
                <Typography variant="h6" fontWeight="600">
                  Payment
                </Typography>
              </Box>
              
              <Stack spacing={2}>
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Status
                  </Typography>
                  <StatusChip status={ticketData.PaymentStatus} />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Method
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    {ticketData.PaymentMethod || 'Not specified'}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </InfoCard>

          {/* Additional Information */}
          <InfoCard sx={{ mb: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <CheckCircleIcon fontSize="small" color="primary" />
                <Typography variant="h6" fontWeight="600">
                  Additional Info
                </Typography>
              </Box>
              
              <Stack spacing={2}>
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Communication With
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    {ticketData.CommunicationWith || 'N/A'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Created By
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    {ticketData.CreatedBy}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Last Updated By
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    {ticketData.LastUpdatedBy}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Code Upload Time
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    {ticketData.CodeUploadTime || 0} hours
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </InfoCard>

          {/* Feedback Section */}
          <FeedbackDisplay
            ratingValue={ticketData.RatingValue}
            ratingDescription={ticketData.RatingDescription}
            ratingBy={ticketData.RatingBy}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

// Example usage with your data
const sampleData = {
  "SrNo": 10,
  "Date": "2025-07-21T12:11:01.200Z",
  "ClientCode": "keval",
  "CreatedBy": "admin admin",
  "TicketNo": "hhjhj",
  "TicketDate": "2025-07-22T00:00:00.000Z",
  "RequestDate": "2025-07-22T00:00:00.000Z",
  "Topic": "Website Development Project",
  "TopicType": "Tag",
  "NoPrints": 0,
  "Description": "This is description for testing the new ticket display component with comprehensive information layout",
  "ServiceType": "Development",
  "PaymentStatus": "Unpaid",
  "PaymentMethod": "",
  "OrderNo": "OD010",
  "OnDemand": "yes",
  "ApprovedStatus": "Pending",
  "Status": "Pending",
  "SentMail": 0,
  "CommunicationWith": "khushbu",
  "ConfirmationDate": null,
  "CodeUploadTime": 1,
  "UpdatedAt": "2025-07-21T12:11:01.200Z",
  "DeliveryDate": null,
  "SampleApprovalDate": null,
  "CurrentStatus": "",
  "RatingValue": 4,
  "RatingDescription": "Great work on the project, very satisfied with the results",
  "RatingBy": "John Doe",
  "LastUpdatedBy": "admin admin",
  "Assignments": "[{\"ID\":18,\"DeliveryID\":10,\"user\":\"admin admin\",\"userid\":\"admin@orail.co.in\",\"Department\":\"Admin\",\"EstimatedHours\":1.000000000000000e+000}]",
  "testingEstimate": null,
  "documentEstimate": null,
  "developerEstimate": null,
  "uiEstimate": null
};

export default function TicketDisplayApp() {
  return <TicketDisplay ticketData={sampleData} />;
}