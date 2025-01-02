import logging
from pathlib import Path

def log(
    logger_name: str = "app_logger",
    log_file: str = "app.log",
    log_level: int = logging.INFO,
    log_format: str = '%(asctime)s - %(levelname)s - [%(name)s] - %(message)s',
    log_dir: str = "logs",
    file_mode: str = 'a',
    encoding: str = 'utf-8'
) -> logging.Logger:

    log_path = Path(log_dir)
    log_path.mkdir(exist_ok=True, parents=True)
    logger = logging.getLogger(logger_name)
    if not logger.handlers:
        logger.setLevel(log_level)
        file_handler = logging.FileHandler(
            log_path / log_file,
            mode=file_mode,
            encoding=encoding
        )
        file_handler.setLevel(log_level)
        formatter = logging.Formatter(log_format)
        file_handler.setFormatter(formatter)
        logger.addHandler(file_handler)

    return logger
