# Dashboard Data Files

This directory contains JSON files that provide data for the dashboard in demo mode.

## Files

- `modules.json` - Contains information about juggling modules
- `achievements.json` - Contains user achievements
- `practiceSessions.json` - Contains practice session records
- `performanceData.json` - Contains performance metrics data
- `user.json` - Contains user profile information

## How to Update

To update the dashboard data, simply edit these JSON files. The changes will be reflected in the dashboard when you refresh the page.

### Example: Adding a New Module

To add a new module, edit `modules.json` and add a new object to the array:

```json
{
  "id": "module-5",
  "name": "New Module Name",
  "description": "Description of the new module",
  "jugglingProp": "balls",
  "techTheme": "New Theme",
  "awsServices": ["Service1", "Service2"],
  "ottoTieIn": "Description of tie-in",
  "reflection": "Reflection prompt",
  "timeEstimate": {
    "tech": "2 hours",
    "juggling": "1 week"
  },
  "status": "locked",
  "progress": 0,
  "unlocked": false
}
```

### Example: Updating User Information

To update user information, edit `user.json`:

```json
{
  "id": "user-123",
  "name": "New User Name",
  "email": "new.email@example.com",
  "avatar": "https://i.pravatar.cc/300",
  "learningStyle": "Activist",
  "level": 8
}
```

## Data Structure

Each file follows a specific structure. Refer to the existing data as a template when making changes.
