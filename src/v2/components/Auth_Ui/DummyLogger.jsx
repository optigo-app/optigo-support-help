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

const OPTIGOCARELY_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBwb3J0Lm9wdGlnbyIsImF1ZCI6ImIzQjBhV2R2WTJGeVpXeDVRR1ZuTG1OdmJRPT0iLCJ1aWQiOiJiM0IwYVdkdlkyRnlaV3g1UUdWbkxtTnZiUT09IiwieWMiOiJlM3R1ZW1WdWZYMTdlekl3ZlgxN2UyOXlZV2xzTWpWOWZYdDdiM0poYVd3eU5YMTkiLCJzdiI6IjAiLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MjA1MDAwMDAwMH0.mock_signature";

const ORAIL_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJpdGFzayIsImF1ZCI6IllXUnRhVzVBYjNKaGFXd3VZMjh1YVc0PSIsInVpZCI6IllXUnRhVzVBYjNKaGFXd3VZMjh1YVc0PSIsInljIjoiZTN0dWVtVnVmWDE3ZXpJd2ZYMTdlMjl5WVdsc01qVjlmWHQ3YjNKaGFXd3lOWDE5Iiwic3YiOiIwIiwiYXRrIjoiYjNKaGFXd3lOVjlCU1Y4NU1EWTFORGN4TnpBd05UTTFOalV4IiwiY3V2ZXIiOiJSNTBCMyIsImV4cCI6MjA1MDAwMDAwMH0.mock_signature";

const USERS = [
  {
    name: "Login 1 Optigocarely",
    token: OPTIGOCARELY_TOKEN,
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
    token: OPTIGOCARELY_TOKEN,
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
    token: OPTIGOCARELY_TOKEN,
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
    token: OPTIGOCARELY_TOKEN,
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
    token: OPTIGOCARELY_TOKEN,
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
    token: ORAIL_TOKEN,
    sessionKey: {
      key: "userRights",
      value: `[]`,
    },
  },
];

export default function PoweredByLogin() {
  const [open, setOpen] = useState(false);

  const handleSelect = (user) => {
    sessionStorage.removeItem("explicit_logout");
    sessionStorage.removeItem("is_third_party");
    Cookies.set("help_support", user.token, { expires: 1 });
    Cookies.set("isUserLoggedIn", "true", { expires: 1, sameSite: "Lax" });
    localStorage.setItem("app_active_skey", user.token);
    localStorage.setItem("auth_mode", "corporate");
    sessionStorage.setItem(user.sessionKey.key, user.sessionKey.value);
    sessionStorage.setItem("isDummyLogger", "true");
    window.location.href = "/";
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
