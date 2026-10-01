import React, { useState, useEffect } from 'react';
import { audioEngine } from '../services/audioEngine';
import { ArrowLeft, Send, CheckCheck, Smartphone } from 'lucide-react';

interface PhoneMessagingProps {
  onComplete: () => void;
}

export const PhoneMessaging: React.FC<PhoneMessagingProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'initial' | 'typing_confession' | 'erasing' | 'typing_reach' | 'sent' | 'reply_received' | 'finished'>('initial');
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<{ id: string; text: string; sender: 'me' | 'her'; time: string }[]>([
    { id: '1', text: 'Notes sent for Chapter 4.', sender: 'her', time: '07:15 PM' },
    { id: '2', text: 'Thanks. Got it.', sender: 'me', time: '07:22 PM' },
  ]);

  useEffect(() => {
    // Step 1: Start typing "I like you." after 800ms
    const t1 = setTimeout(() => {
      setPhase('typing_confession');
      const textToType = 'I like you.';
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i <= textToType.length) {
          setInputText(textToType.slice(0, i));
          audioEngine.playKeyType();
          i++;
        } else {
          clearInterval(typeInterval);
          // Pause and contemplate
          setTimeout(() => {
            setPhase('erasing');
          }, 1800);
        }
      }, 140);
    }, 1000);

    return () => clearTimeout(t1);
  }, []);

  // Handle erasing
  useEffect(() => {
    if (phase === 'erasing') {
      const textToErase = 'I like you.';
      let len = textToErase.length;
      const eraseInterval = setInterval(() => {
        if (len >= 0) {
          setInputText(textToErase.slice(0, len));
          audioEngine.playKeyType();
          len--;
        } else {
          clearInterval(eraseInterval);
          // Now type "Did you reach?"
          setTimeout(() => {
            setPhase('typing_reach');
          }, 600);
        }
      }, 110);
    }
  }, [phase]);

  // Handle typing "Did you reach?"
  useEffect(() => {
    if (phase === 'typing_reach') {
      const textToType = 'Did you reach?';
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i <= textToType.length) {
          setInputText(textToType.slice(0, i));
          audioEngine.playKeyType();
          i++;
        } else {
          clearInterval(typeInterval);
          // Automatically send after small pause
          setTimeout(() => {
            setMessages(prev => [
              ...prev,
              { id: '3', text: 'Did you reach?', sender: 'me', time: '11:43 PM' },
            ]);
            setInputText('');
            setPhase('sent');
            audioEngine.playClick();
          }, 800);
        }
      }, 120);
    }
  }, [phase]);

  // Handle her reply "Yes."
  useEffect(() => {
    if (phase === 'sent') {
      const replyTimer = setTimeout(() => {
        audioEngine.playPhoneVibrate();
        setMessages(prev => [
          ...prev,
          { id: '4', text: 'Yes.', sender: 'her', time: '11:44 PM' },
        ]);
        setPhase('reply_received');
        setTimeout(() => {
          setPhase('finished');
        }, 1500);
      }, 2400);

      return () => clearTimeout(replyTimer);
    }
  }, [phase]);

  return (
    <div className="absolute inset-0 z-40 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      {/* Phone Mockup Frame */}
      <div className="w-full max-w-sm bg-neutral-900 border border-neutral-700 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col h-[560px] relative">
        {/* Phone Notch / Speaker */}
        <div className="bg-neutral-950 pt-3 pb-2 px-6 flex justify-between items-center text-xs text-neutral-400 select-none">
          <span className="font-mono">11:42 PM</span>
          <div className="w-20 h-4 bg-neutral-900 rounded-full" />
          <span>84%</span>
        </div>

        {/* Chat Header */}
        <div className="bg-neutral-800/90 px-4 py-3 border-b border-neutral-700/60 flex items-center gap-3">
          <ArrowLeft className="w-4 h-4 text-neutral-300" />
          <div className="w-9 h-9 rounded-full bg-amber-700/40 border border-amber-600/40 flex items-center justify-center text-amber-200 font-semibold text-sm">
            A
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-neutral-100">Ananya</h4>
            <p className="text-[11px] text-emerald-400">
              {phase === 'sent' ? 'typing...' : 'online'}
            </p>
          </div>
          <Smartphone className="w-4 h-4 text-neutral-500" />
        </div>

        {/* Chat Message Scroll */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#121318]">
          <div className="text-center my-2">
            <span className="text-[10px] text-neutral-500 bg-neutral-800/60 px-3 py-1 rounded-full">
              TODAY
            </span>
          </div>

          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'} transition-all`}
            >
              <div
                className={`max-w-[78%] px-3.5 py-2 rounded-2xl text-sm ${
                  msg.sender === 'me'
                    ? 'bg-sky-600 text-white rounded-br-none'
                    : 'bg-neutral-800 text-neutral-200 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
              <div className="flex items-center gap-1 mt-1 px-1 text-[10px] text-neutral-500">
                <span>{msg.time}</span>
                {msg.sender === 'me' && <CheckCheck className="w-3 h-3 text-sky-400" />}
              </div>
            </div>
          ))}

          {/* Typing indicator when she is about to reply */}
          {phase === 'sent' && (
            <div className="flex items-center gap-1 bg-neutral-800 text-neutral-400 px-3 py-2 rounded-xl w-14 animate-pulse">
              <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          )}
        </div>

        {/* Text Input Bar */}
        <div className="p-3 bg-neutral-900 border-t border-neutral-800 flex items-center gap-2">
          <div className="flex-1 bg-neutral-800/80 rounded-full px-4 py-2 text-sm text-neutral-200 border border-neutral-700/50 flex items-center min-h-[38px]">
            {inputText ? (
              <span className="text-white">{inputText}</span>
            ) : (
              <span className="text-neutral-500 text-xs">Message...</span>
            )}
            <span className="w-0.5 h-4 bg-sky-400 ml-0.5 animate-pulse" />
          </div>
          <button
            disabled
            className="w-9 h-9 rounded-full bg-sky-600 flex items-center justify-center text-white opacity-80"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Phase Commentary / Next Action */}
        {phase === 'finished' && (
          <div className="p-3 bg-neutral-950 border-t border-neutral-800 text-center animate-fade-in">
            <p className="text-xs text-neutral-400 mb-2 italic font-serif">
              "Did you reach?" was always what he meant to say.
            </p>
            <button
              onClick={() => {
                audioEngine.playClick();
                onComplete();
              }}
              className="w-full py-2 bg-stone-100 hover:bg-white text-stone-900 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              Put Phone Down · Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
