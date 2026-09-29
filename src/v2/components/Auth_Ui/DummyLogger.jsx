import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Cookies from "js-cookie";

const PoweredByChip = styled(Chip)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  borderRadius: 16,
  boxShadow: theme.shadows[3],
  background: "linear-gradient(135deg, #b2069b 0%, #3909c2 100%)",
  backdropFilter: "blur(6px)",
  fontWeight: 500,
  color: "#fff",
  cursor: "pointer",
  "&:hover": {
    background: "linear-gradient(135deg, #b2069b 0%, #3909c2 100%)",
    color: "#fff",
  },
}));

const USERS = [
  {
    name: "Login 1 Optigocarely",
    token:
      "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBwb3J0Lm9wdGlnbyIsImF1ZCI6ImIzQjBhV2R2WTJGeVpXeDVRR1ZuTG1OdmJRPT0iLCJ1aWQiOiJiM0IwYVdkdlkyRnlaV3g1UUdWbkxtTnZiUT09IiwieWMiOiJlM3R1ZW1WdWZYMTdlekl3ZlgxN2UyOXlZV2xzTWpWOWZYdDdiM0poYVd3eU5YMTkiLCJzdiI6IjAiLCJpYXQiOjE3NzAzNjc4NDYsImV4cCI6MTc3MDU0MDY0Nn0._GKCmVUM-x-moy5UDCqQ1fvME86i2uix7i8S9ShY1KQ",
    sessionKey: {
      key: "userRights",
      value: `[
    {
        "id": 1291,
        "title": "Task(s)"
    },
    {
        "id": 15461,
        "title": "Calendar Schedule"
    },
    {
        "id": 17079,
        "title": "Task Calender View"
    },
    {
        "id": 18206,
        "title": "PowerBi Test"
    },
    {
        "id": 18235,
        "title": "CallLog"
    },
    {
        "id": 18240,
        "title": "QuickTask"
    },
    {
        "id": 18247,
        "title": "ADD TRAINING"
    },
 
    {
        "id": 18290,
        "title": "CallBack Request"
    },
    {
        "id": 18292,
        "title": "Training Dashboard"
    },
    {
        "id": 18293,
        "title": "CallLog"
    },
       {
        "id": 18256,
        "title": "Ticket"
    },
    {
        "id": 18262,
        "title": "Ticket ( Admin )"
    },
    {
        "id": 18294,
        "title": "Ticket"
    }
]`,
    },
  },
  {
    name: "Login 2 Optigocarely",
    token:
      "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBwb3J0Lm9wdGlnbyIsImF1ZCI6ImIzQjBhV2R2WTJGeVpXeDVRR1ZuTG1OdmJRPT0iLCJ1aWQiOiJiM0IwYVdkdlkyRnlaV3g1UUdWbkxtTnZiUT09IiwieWMiOiJlM3R1ZW1WdWZYMTdlekl3ZlgxN2UyOXlZV2xzTWpWOWZYdDdiM0poYVd3eU5YMTkiLCJzdiI6IjAiLCJpYXQiOjE3NzAzNjc4NDYsImV4cCI6MTc3MDU0MDY0Nn0._GKCmVUM-x-moy5UDCqQ1fvME86i2uix7i8S9ShY1KQ",
    sessionKey: {
      key: "userRights",
      value: `[
    {
        "id": 1291,
        "title": "Task(s)"
    },
    {
        "id": 15461,
        "title": "Calendar Schedule"
    },
    {
        "id": 17079,
        "title": "Task Calender View"
    },
    {
        "id": 18206,
        "title": "PowerBi Test"
    },
    {
        "id": 18235,
        "title": "CallLog"
    },
    {
        "id": 18240,
        "title": "QuickTask"
    },
    {
        "id": 18247,
        "title": "ADD TRAINING"
    },
    {
        "id": 18256,
        "title": "Ticket"
    },
    {
        "id": 18262,
        "title": "Ticket ( Admin )"
    },
    {
        "id": 18277,
        "title": "Order Delivery ( Admin )"
    },
    {
        "id": 18290,
        "title": "CallBack Request"
    },
    {
        "id": 18291,
        "title": "Order Delivery Dashboard"
    },
    {
        "id": 18292,
        "title": "Training Dashboard"
    },
    {
        "id": 18293,
        "title": "CallLog"
    },
    {
        "id": 18294,
        "title": "Ticket"
    },
    {
        "id": 18321,
        "title": "Order Request"
    }
]`,
    },
  },
  {
    name: "Login 3 Optigocarely",
    token:
      "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBwb3J0Lm9wdGlnbyIsImF1ZCI6ImIzQjBhV2R2WTJGeVpXeDVRR1ZuTG1OdmJRPT0iLCJ1aWQiOiJiM0IwYVdkdlkyRnlaV3g1UUdWbkxtTnZiUT09IiwieWMiOiJlM3R1ZW1WdWZYMTdlekl3ZlgxN2UyOXlZV2xzTWpWOWZYdDdiM0poYVd3eU5YMTkiLCJzdiI6IjAiLCJpYXQiOjE3NzAzNjc4NDYsImV4cCI6MTc3MDU0MDY0Nn0._GKCmVUM-x-moy5UDCqQ1fvME86i2uix7i8S9ShY1KQ",
    sessionKey: {
      key: "userRights",
      value: `[
            {
                "id": 1291,
                "title": "Task(s)"
            },
            {
                "id": 15461,
                "title": "Calendar Schedule"
            },
            {
                "id": 17079,
                "title": "Task Calender View"
            },
            {
                "id": 18206,
                "title": "PowerBi Test"
            },
            {
                "id": 18235,
                "title": "CallLog"
            },
            {
                "id": 18240,
                "title": "QuickTask"
            },
            {
                "id": 18247,
                "title": "ADD TRAINING"
            },
            {
                "id": 18256,
                "title": "Ticket"
            },
            {
                "id": 18262,
                "title": "Ticket ( Admin )"
            },
            {
                "id": 18277,
                "title": "Order Delivery ( Admin )"
            },
            {
                "id": 18290,
                "title": "CallBack Request"
            },
            {
                "id": 18291,
                "title": "Order Delivery Dashboard"
            },
            {
                "id": 18292,
                "title": "Training Dashboard"
            },
            {
                "id": 18293,
                "title": "CallLog"
            },
            {
                "id": 18294,
                "title": "Ticket"
            },
            {
                "id": 18321,
                "title": "Order Request"
            }
        ]`,
    },
  },
  {
    name: "Login 4 Optigocarely",
    token:
      "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBwb3J0Lm9wdGlnbyIsImF1ZCI6ImIzQjBhV2R2WTJGeVpXeDVRR1ZuTG1OdmJRPT0iLCJ1aWQiOiJiM0IwYVdkdlkyRnlaV3g1UUdWbkxtTnZiUT09IiwieWMiOiJlM3R1ZW1WdWZYMTdlekl3ZlgxN2UyOXlZV2xzTWpWOWZYdDdiM0poYVd3eU5YMTkiLCJzdiI6IjAiLCJpYXQiOjE3NzAzNjc4NDYsImV4cCI6MTc3MDU0MDY0Nn0._GKCmVUM-x-moy5UDCqQ1fvME86i2uix7i8S9ShY1KQ",
    sessionKey: {
      key: "userRights",
      value: `[
    {
        "id": 1291,
        "title": "Task(s)"
    },
    {
        "id": 15461,
        "title": "Calendar Schedule"
    },
    {
        "id": 17079,
        "title": "Task Calender View"
    },
    {
        "id": 18206,
        "title": "PowerBi Test"
    },
    {
        "id": 18235,
        "title": "CallLog"
    },
    {
        "id": 18240,
        "title": "QuickTask"
    },
    {
        "id": 18247,
        "title": "ADD TRAINING"
    },
    {
        "id": 18256,
        "title": "Ticket"
    },
    {
        "id": 18262,
        "title": "Ticket ( Admin )"
    },
    {
        "id": 18277,
        "title": "Order Delivery ( Admin )"
    },
    {
        "id": 18290,
        "title": "CallBack Request"
    },
    {
        "id": 18291,
        "title": "Order Delivery Dashboard"
    },
    {
        "id": 18292,
        "title": "Training Dashboard"
    },
    {
        "id": 18293,
        "title": "CallLog"
    },
    {
        "id": 18294,
        "title": "Ticket"
    },
    {
        "id": 18321,
        "title": "Order Request"
    }
]`,
    },
  },
  {
    name: "Login 5 Optigocarely",
    token:
      "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBwb3J0Lm9wdGlnbyIsImF1ZCI6ImIzQjBhV2R2WTJGeVpXeDVRR1ZuTG1OdmJRPT0iLCJ1aWQiOiJiM0IwYVdkdlkyRnlaV3g1UUdWbkxtTnZiUT09IiwieWMiOiJlM3R1ZW1WdWZYMTdlekl3ZlgxN2UyOXlZV2xzTWpWOWZYdDdiM0poYVd3eU5YMTkiLCJzdiI6IjAiLCJpYXQiOjE3NzAzNjc4NDYsImV4cCI6MTc3MDU0MDY0Nn0._GKCmVUM-x-moy5UDCqQ1fvME86i2uix7i8S9ShY1KQ",
    sessionKey: {
      key: "userRights",
      value: `[
    {
        "id": 1291,
        "title": "Task(s)"
    },
    {
        "id": 15461,
        "title": "Calendar Schedule"
    },
    {
        "id": 17079,
        "title": "Task Calender View"
    },
    {
        "id": 18206,
        "title": "PowerBi Test"
    },
    {
        "id": 18235,
        "title": "CallLog"
    },
    {
        "id": 18240,
        "title": "QuickTask"
    },
    {
        "id": 18247,
        "title": "ADD TRAINING"
    },
    {
        "id": 18256,
        "title": "Ticket"
    },
    {
        "id": 18262,
        "title": "Ticket ( Admin )"
    },
    {
        "id": 18277,
        "title": "Order Delivery ( Admin )"
    },
    {
        "id": 18290,
        "title": "CallBack Request"
    },
    {
        "id": 18291,
        "title": "Order Delivery Dashboard"
    },
    {
        "id": 18292,
        "title": "Training Dashboard"
    },
    {
        "id": 18293,
        "title": "CallLog"
    },
    {
        "id": 18294,
        "title": "Ticket"
    },
    {
        "id": 18321,
        "title": "Order Request"
    }
]`,
    },
  },
  {
    name: "Login 6 orail25",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJpdGFzayIsImF1ZCI6IllXUnRhVzVBYjNKaGFXd3VZMjh1YVc0PSIsImV4cCI6MTc4MzU3NDYyOSwidWlkIjoiWVdSdGFXNUFiM0poYVd3dVkyOHVhVzQ9IiwieWMiOiJlM3R1ZW1WdWZYMTdlekl3ZlgxN2UyOXlZV2xzTWpWOWZYdDdiM0poYVd3eU5YMTkiLCJzdiI6IjAiLCJhdGsiOiJiM0poYVd3eU5WOUJTVjg1TURZMU5EY3hOekF3TlRNMU5qVXgiLCJjdXZlciI6IlI1MEIzIn0.Aa3nFoAWG7HlcdcF3uc53XHGHiTjyOzc6ssQtgx8uRA",
    sessionKey: {
      key: "userRights",
      value: `[]`,
    },
  },
];

export default function PoweredByLogin() {
  const [open, setOpen] = useState(false);

  const handleSelect = (user) => {
    Cookies.set("help_support", user.token, { expires: 1 }); // 1-day expiry
    Cookies.set("isUserLoggedIn", true, { expires: 1 });
    sessionStorage.setItem(user.sessionKey.key, user.sessionKey.value);
    sessionStorage.setItem("isDummyLogger", "true");
    window.location.reload();
  };

  return (
    <>
      <PoweredByChip label="Powered by Optigo" onClick={() => setOpen(true)} />

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: { borderRadius: 3, p: 1, minWidth: 320 },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600, textAlign: "center" }}>
          Choose your login
        </DialogTitle>
        <DialogContent>
          <List>
            {USERS.map((user) => (
              <ListItemButton
                key={user.name}
                onClick={() => handleSelect(user)}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  "&:hover": {
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                  },
                }}
              >
                <ListItemText primary={user.name} />
              </ListItemButton>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
}
