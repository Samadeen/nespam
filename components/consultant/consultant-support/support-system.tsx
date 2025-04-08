'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { FileText, Image as ImageIcon, Send } from 'lucide-react';
// import supportImage from '@/public/assets/support.png';

interface SupportOption {
  id: string;
  title: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: string;
  file?: {
    name: string;
    url: string;
    type: 'document' | 'image';
  };
}

const SupportSystem = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const documentInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const supportOptions: SupportOption[] = [
    { id: 'permit', title: 'Permit application' },
    { id: 'environmental', title: 'Environmental Reports' },
    { id: 'clients', title: 'Clients' },
    { id: 'payments', title: 'Payments' },
    { id: 'documents', title: 'Documents' },
    { id: 'others', title: 'Others' },
  ];

  const handleOptionClick = (optionId: string) => {
    const selectedTitle = supportOptions.find(
      (opt) => opt.id === optionId
    )?.title;
    setSelectedOption(optionId);
    setShowChat(true);
    // Set the initial message with the selected option
    setMessages([
      {
        id: Date.now().toString(),
        text: selectedTitle || '',
        sender: 'user',
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        }),
      },
    ]);
  };

  const handleFileUpload = async (file: File, type: 'document' | 'image') => {
    if (!file) return;

    setIsUploading(true);
    try {
      // Here you would normally upload the file to your server/storage
      // For now, we'll create a local URL
      const fileUrl = URL.createObjectURL(file);

      setMessages([
        ...messages,
        {
          id: Date.now().toString(),
          text: `Uploaded ${type}: ${file.name}`,
          sender: 'user',
          timestamp: new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          }),
          file: {
            name: file.name,
            url: fileUrl,
            type: type,
          },
        },
      ]);
    } catch (error) {
      console.error('Error uploading file:', error);
      // You might want to show an error message to the user
    } finally {
      setIsUploading(false);
    }
  };

  const handleDocumentClick = () => {
    documentInputRef.current?.click();
  };

  const handleImageClick = () => {
    imageInputRef.current?.click();
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now().toString(),
          text: inputMessage,
          sender: 'user',
          timestamp: new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          }),
        },
      ]);
      setInputMessage('');
    }
  };

  return (
    <div className=''>
      {!showChat && (
        <>
          <div className='mb-4'>
            <h1 className='text-[#3E8290] text-2xl not-italic font-medium leading-[normal] mb-2'>
              Support
            </h1>
            <p className='text-[#696969] text-sm not-italic font-normal leading-[normal]'>
              Reach out to support team
            </p>
          </div>

          <div className='text-[#696969] text-sm not-italic font-normal leading-[normal] mb-8 flex items-center gap-2'>
            Dashboard <span className='text-[#3E8290]'>{'>'}</span> Support
          </div>
        </>
      )}

      {!showChat ? (
        <div className='min-h-[500px] flex items-center justify-center'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto'>
            {supportOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                className='border border-[#3E8290] rounded-lg p-4 text-center hover:bg-[#3E8290] hover:text-white transition-colors duration-200 text-[#3E8290]'
              >
                {option.title}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className='max-w-5xl mx-auto'>
          {/* Date Header */}
          <div className='text-center mb-6'>
            <span className='bg-[#F4F4F4] text-[#696969] px-4 py-1 rounded-full text-sm'>
              17th Feb 2025
            </span>
          </div>

          {/* Chat Area */}
          <div className='h-[calc(100vh-280px)] overflow-y-auto mb-4'>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                } mb-4`}
              >
                <div
                  className={`flex items-start gap-2 max-w-[70%] ${
                    message.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  {message.sender === 'support' && (
                    <div className='w-8 h-8 rounded-full bg-gray-200 flex-shrink-0' />
                  )}
                  <div
                    className={`flex flex-col ${
                      message.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    {message.sender === 'user' && (
                      <div className='flex items-center gap-2 mb-1'>
                        <span className='text-sm text-[#696969]'>
                          David Ogwu
                        </span>
                        <div className='w-8 h-8 rounded-full bg-gray-200' />
                      </div>
                    )}
                    <div
                      className={`rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-[#2A454B] text-white'
                          : 'bg-gray-100'
                      }`}
                    >
                      <p>{message.text}</p>
                      {message.file && (
                        <div className='mt-2'>
                          {message.file.type === 'document' ? (
                            <a
                              href={message.file.url}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='flex items-center gap-2 text-sm underline'
                            >
                              <FileText size={16} />
                              {message.file.name}
                            </a>
                          ) : (
                            <a
                              href={message.file.url}
                              target='_blank'
                              rel='noopener noreferrer'
                            >
                              <Image
                                src={message.file.url}
                                alt={message.file.name}
                                width={200}
                                height={150}
                                className='rounded-md'
                              />
                            </a>
                          )}
                        </div>
                      )}
                      <span
                        className={`text-xs ${
                          message.sender === 'user'
                            ? 'text-gray-300'
                            : 'text-gray-500'
                        } block text-right mt-1`}
                      >
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className='bg-white rounded-[30px] border border-[#3E8290] p-2'>
            <div className='flex items-center gap-2'>
              <input
                type='file'
                ref={documentInputRef}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file, 'document');
                }}
                accept='.pdf,.doc,.docx,.txt'
                className='hidden'
              />
              <input
                type='file'
                ref={imageInputRef}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file, 'image');
                }}
                accept='image/*'
                className='hidden'
              />
              <button
                onClick={handleDocumentClick}
                className='w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100'
                disabled={isUploading}
              >
                <FileText className='w-5 h-5 text-[#696969]' />
              </button>
              <button
                onClick={handleImageClick}
                className='w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100'
                disabled={isUploading}
              >
                <ImageIcon className='w-5 h-5 text-[#696969]' />
              </button>
              <input
                type='text'
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder='Type message'
                className='flex-1 bg-transparent outline-none text-gray-700 px-2'
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              <button
                onClick={handleSendMessage}
                className='w-10 h-10 rounded-full flex items-center justify-center bg-[#2A454B] hover:bg-[#1a2c30] transition-colors'
                disabled={isUploading}
              >
                <Send className='w-5 h-5 text-white' />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportSystem;
