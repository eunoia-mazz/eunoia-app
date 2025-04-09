FROM python:3.10-slim

WORKDIR /app

# Install system dependencies all at once to reduce layers
RUN apt-get update && apt-get install -y \
    build-essential \
    python3-dev \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Pre-install build tools to speed up subsequent installations
RUN pip install --no-cache-dir \
    wheel \
    setuptools \
    cython

# Install the heaviest packages first using pre-built wheels
RUN pip install --no-cache-dir \
    torch==2.0.1 \
    transformers==4.31.0 \
    sentence-transformers==2.2.2 \
    huggingface-hub==0.16.4 \
    numpy \
    scipy \
    scikit-learn

# Create necessary directories
RUN mkdir -p /app/models /app/chroma_db
RUN touch quran.txt bible.txt

# Set environment variables for increased timeout and better download handling
ENV HF_HUB_DOWNLOAD_TIMEOUT=2000
ENV REQUESTS_TIMEOUT=2000
ENV TRANSFORMERS_CACHE=/app/models
ENV HF_HOME=/app/models
ENV HF_ENDPOINT=https://huggingface.co
ENV HTTP_PROXY=""
ENV HTTPS_PROXY=""
ENV CURL_VERBOSE=1
ENV TOKENIZERS_PARALLELISM=false

# Pre-download the model with retry mechanism
RUN for i in $(seq 1 3); do \
    python -c "from sentence_transformers import SentenceTransformer; model = SentenceTransformer('all-MiniLM-L6-v2', cache_folder='/app/models')" && break || \
    if [ $i -eq 3 ]; then exit 1; fi; \
    echo "Attempt $i failed. Retrying..." && sleep 10; \
    done

# Copy and install remaining requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend application
COPY . .

EXPOSE 5000

CMD ["python", "app.py"] 