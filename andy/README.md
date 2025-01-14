# Project Folder Structure

Here is the folder structure for the project:

```
/Users/arpanbhandari/Documents/coding/arpanbhandari/andy/
├── app/
├── logs/
├── .env
├── .gitignore
├── README.md
├── main.py
└── server.py
```

## Description

This project contains the following main components:

- `app/`: Contains the application code.
- `logs/`: Stores log files.
- `.env`: Environment configuration file.
- `.gitignore`: Specifies files to be ignored by Git.
- `README.md`: Project documentation.
- `main.py`: Main application script.
- `server.py`: Server-related code.

## Setup Instructions

### Conda Environment

To create a conda environment and install all necessary packages, use the following commands:

```sh
conda env create -f environment.yml
conda activate andy
```

### Pip Packages

To install the packages listed in `requirements.txt`, use the following command:

```sh
pip install -r requirements.txt
```

### Running the Server

After installation, start the server with:

```sh
python server.py
```

## Environment Configuration

1. Create a `.env` file and populate it according to `.env.example`.
2. Ensure you have a PostgreSQL server running. By default, the project uses the same database used by the `cms`.
3. Obtain an OpenAI key to use the relevant features.
