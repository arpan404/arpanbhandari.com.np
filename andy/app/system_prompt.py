from typing import Dict

SYSTEM_PROMPT: Dict[str, str] = {
    'start': 'What would you like to do?',
    'options': {
        'projects': 'View projects',
        'skills': 'View skills',
        'exit': 'Exit'
    },
    'invalid': 'Invalid option. Please try again.',
    'exit': 'Goodbye!'

}
