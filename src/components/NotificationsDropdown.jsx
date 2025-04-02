
import React, { useRef, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from 'date-fns';
import { Bell, X, CheckCheck, Info, Gift, Tag } from 'lucide-react';
import { useNotifications } from '@/context/NotificationsContext';

const NotificationsDropdown = ({ isOpen, onClose }) => {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getTypeIcon = (type) => {
    switch (type) {
      case 'promotion': return <Tag className="h-5 w-5 text-pink-400" />;
      case 'points': return <Gift className="h-5 w-5 text-green-400" />;
      case 'system': return <Info className="h-5 w-5 text-xforge-teal" />;
      default: return <Bell className="h-5 w-5 text-xforge-gray" />;
    }
  };

  return (
    <div 
      ref={dropdownRef}
      className="absolute top-14 right-0 w-80 bg-xforge-dark border border-xforge-lightgray rounded-lg shadow-lg z-50 animate-fade-in"
    >
      <div className="flex items-center justify-between p-4 border-b border-xforge-lightgray">
        <h3 className="text-white font-semibold">Notifications</h3>
        <div className="flex items-center gap-2">
          <button 
            onClick={markAllAsRead}
            className="p-1.5 text-xforge-gray hover:text-xforge-teal transition-colors"
            title="Mark all as read"
          >
            <CheckCheck size={16} />
          </button>
          <button 
            onClick={onClose}
            className="p-1.5 text-xforge-gray hover:text-xforge-teal transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      
      <ScrollArea className="h-80">
        {notifications.length > 0 ? (
          <div className="divide-y divide-xforge-lightgray">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-4 hover:bg-xforge-darkgray transition-colors ${notification.read ? 'opacity-70' : ''}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    {getTypeIcon(notification.type)}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h4 className="text-white font-medium">{notification.title}</h4>
                      <span className="text-xs text-xforge-gray">
                        {formatDistanceToNow(new Date(notification.date), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-sm text-xforge-gray mt-1">{notification.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <Bell className="text-xforge-gray mb-3" size={32} />
            <p className="text-xforge-gray">No notifications yet</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default NotificationsDropdown;
