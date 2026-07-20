import React from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';

export default function RagDataPrep() {
  const toc = [
    { label: "Document Loaders", hash: "document-loaders" },
    { label: "Document Parsing & OCR", hash: "parsing-ocr" },
    { label: "Data Cleaning", hash: "data-cleaning" },
    { label: "Metadata Extraction", hash: "metadata" },
    { label: "Supported File Formats", hash: "formats" }
  ];

  return (
    <GuideLayout
      title="Data Preparation"
      intro="Getting unstructured data ready for the vector database."
      toc={toc}
    >
      <div className="space-y-12">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          id="document-loaders" 
          className="scroll-mt-24"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Document Loaders</h2>
          <p className="text-gray-300 leading-relaxed">
            The first step in any pipeline is ingesting data from various sources (PDFs, Notion, Slack, S3). Tools like LangChain provide hundreds of pre-built loaders to fetch this data.
          </p>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          id="parsing-ocr" 
          className="scroll-mt-24"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Document Parsing & OCR</h2>
          <p className="text-gray-300 leading-relaxed">
            Once loaded, unstructured files (like PDFs) must be parsed into raw text. Standard parsers handle text-based PDFs, but scanned documents require Optical Character Recognition (OCR) tools like Tesseract or Unstructured.io to extract text from images.
          </p>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          id="data-cleaning" 
          className="scroll-mt-24"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Data Cleaning</h2>
          <p className="text-gray-300 leading-relaxed">
            Raw text is often messy. Cleaning involves stripping out HTML tags, removing redundant whitespace, fixing character encodings, and dropping useless boilerplate (headers/footers) that could confuse the embedding model.
          </p>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          id="metadata" 
          className="scroll-mt-24"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Metadata Extraction</h2>
          <p className="text-gray-300 leading-relaxed">
            Alongside the text, it is critical to extract metadata (e.g., author, date, source URL, page number). This allows for strict filtering later during retrieval (e.g., "Only search documents from 2023").
          </p>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          id="formats" 
          className="scroll-mt-24"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Supported File Formats</h2>
          <p className="text-gray-300 leading-relaxed">
            A robust RAG system handles <code className="px-1.5 py-0.5 bg-gray-800 rounded text-blue-300 font-mono text-sm">.txt</code>, <code className="px-1.5 py-0.5 bg-gray-800 rounded text-blue-300 font-mono text-sm">.md</code>, <code className="px-1.5 py-0.5 bg-gray-800 rounded text-blue-300 font-mono text-sm">.pdf</code>, <code className="px-1.5 py-0.5 bg-gray-800 rounded text-blue-300 font-mono text-sm">.docx</code>, <code className="px-1.5 py-0.5 bg-gray-800 rounded text-blue-300 font-mono text-sm">.csv</code>, and HTML. Advanced systems also handle tabular data by converting tables into markdown formats before chunking.
          </p>
        </motion.section>
      </div>
    </GuideLayout>
  );
}
