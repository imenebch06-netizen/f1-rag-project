import re
import certifi
from pymongo import MongoClient
from langchain_ollama import OllamaEmbeddings
from langchain_mongodb import MongoDBAtlasVectorSearch
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

import key_param

# 1. Connect to MongoDB Atlas
client = MongoClient(key_param.MONGODB_URI, tlsCAFile=certifi.where())
dbName = "book_formula_one_chunks"
collectionName = "chunked_data"
collection = client[dbName][collectionName]
# Wipe old noisy chunks
collection.delete_many({})

# 2. Load PDF
loader = PyPDFLoader("./sample_files/Formula_One.pdf")
pages = loader.load()

# 3. Clean Wikipedia Infobox / Table Noise
def clean_wikipedia_text(raw_text: str) -> str:
    # Remove citations like [71], [72]
    text = re.sub(r'\[\d+\]', '', raw_text)
    
    # Remove standalone infobox metadata lines
    lines = text.split('\n')
    cleaned_lines = []
    for line in lines:
        line_str = line.strip()
        # Skip typical infobox line noise
        if any(noise in line_str for noise in ["Inaugural season", "Tyre suppliers", "Official website", "Category Open-wheel"]):
            continue
        cleaned_lines.append(line_str)
        
    text = " ".join(cleaned_lines)
    # Normalize spaces
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

# Apply cleaning
for page in pages:
    page.page_content = clean_wikipedia_text(page.page_content)

# 4. Chunking with Sentence-Focused Boundaries
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=800,
    chunk_overlap=150,
    separators=["\n\n", ". ", " ", ""]
)

split_docs = text_splitter.split_documents(pages)

# 5. Store cleaned chunks
embeddings = OllamaEmbeddings(model="nomic-embed-text")

print(f"Uploading {len(split_docs)} cleaned chunks...")
MongoDBAtlasVectorSearch.from_documents(
    documents=split_docs,
    embedding=embeddings,
    collection=collection
)

print("Clean data stored successfully!")