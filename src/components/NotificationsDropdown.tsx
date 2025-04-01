
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from 'date-fns';
import { Bell, X, CheckCheck } from 'lucide-react';
import { useNotifications } from '@/context/NotificationsContext';

interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({ isOpen, onClose }) => {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();

  if (!isOpen) return null;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'promotion': return 'bg-pink-500';
      case 'points': return 'bg-green-500';
      case 'system': return 'bg-xforge-teal';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="absolute top-14 right-0 w-80 bg-xforge-dark border border-xforge-lightgray rounded-lg shadow-lg z-50">
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
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notification.read ? 'bg-transparent' : getTypeColor(notification.type)}`} />
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
      
      <div className="p-3 border-t border-xforge-lightgray">
        <button 
          className="w-full py-2 text-sm text-center text-xforge-teal hover:underline transition-colors"
        >
          View All Notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationsDropdown;
