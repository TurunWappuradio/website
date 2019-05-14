# Shoutbox

## Components

### Messageformatter
Formats a single message, adds styles and colors (such as admin color) when needed, and includes a "ban" button for admins.
Background color is defined separately in messagelisting (main index).

### Messageinput
Creates an input field for message, and submit button is enabled once message has been entered. The submit button is supplied a function for posting, from main index.
This component is rendered after name has been submitted.
Between messages there is a 2 second timeout before another can be sent.
There is also a 200 character limit on messages.
