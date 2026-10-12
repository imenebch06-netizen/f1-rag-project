from langchain_mongodb import MongoDBAtlasVectorSearch
from langchain_ollama import OllamaEmbeddings, ChatOllama
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
import key_param

# 1. Database & Index Setup
dbName = "book_formula_one_chunks"
collectionName = "chunked_data"
index = "vector_index"

# 2. Local Embedding Model
embeddings = OllamaEmbeddings(model="nomic-embed-text")

# 3. Connect to MongoDB Atlas Vector Store
vectorStore = MongoDBAtlasVectorSearch.from_connection_string(
    key_param.MONGODB_URI,
    f"{dbName}.{collectionName}",
    embeddings,
    index_name=index,
)

def query_data(query):
    # Configure retriever to fetch top 5 relevant chunks
    retriever = vectorStore.as_retriever(
        search_type="similarity",
        search_kwargs={"k": 5}
    )

    # 4. Prompt Template for RAG
    template = """
    Use the following pieces of context to answer the question at the end.
    If you don't know the answer based on the context, just say that you don't know. Do not try to make up an answer.
    Keep the response clear, direct, and concise.
    If the context is not relevant to the question, respond with "The provided context does not contain information relevant to the question."
    If you are able to develop a response based on the context, provide a clear and concise answer. If the context is insufficient, indicate that more information is needed.
    Respond in a professional and informative manner, ensuring that the answer is accurate and based solely on the provided context.
    Context:
    {context}

    Question: {question}

    Answer:
    """

    custom_rag_prompt = PromptTemplate.from_template(template)

    # Helper function to join retrieved document contents
    def format_docs(docs):
        return "\n\n".join(doc.page_content for doc in docs)

    # 5. Define retrieval dictionary mapping
    retrieve_chain = {
        "context": retriever | format_docs,
        "question": RunnablePassthrough()
    }

    # 6. Local Chat Model (Ollama)
    llm = ChatOllama(model="llama3", temperature=0)

    # 7. Output Parser
    response_parser = StrOutputParser()

    # 8. Link components using LangChain Expression Language (LCEL)
    rag_chain = (
        retrieve_chain
        | custom_rag_prompt
        | llm
        | response_parser
    )

    # Execute chain and return generated response
    answer = rag_chain.invoke(query)
    return answer

if __name__ == "__main__":
    question = "who is hamilton's child?"
    print(f"Question: {question}\n")
    print("Generating answer...\n")
    answer = query_data(question)
    print(f"Answer: {answer}")