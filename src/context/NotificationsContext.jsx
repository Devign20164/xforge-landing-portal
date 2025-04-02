
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { toast } from 'sonner';

const NotificationsContext = createContext(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const { toast: uiToast } = useToast();

  useEffect(() => {
    // Load notifications from localStorage on mount
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    } else {
      // Set default notifications if none exist
      const defaultNotifications = [
        {
          id: '1',
          title: 'Welcome to XForge!',
          message: 'Welcome to your XForge account! Explore our products and earn points.',
          read: false,
          date: new Date().toISOString(),
          type: 'system'
        },
        {
          id: '2',
          title: 'Special Offer',
          message: 'Use code WELCOME10 for 10% off your first purchase.',
          read: false,
          date: new Date().toISOString(),
          type: 'promotion'
        },
        {
          id: '3',
          title: 'Points Awarded',
          message: 'You\'ve earned 100 points for creating your account!',
          read: false,
          date: new Date().toISOString(),
          type: 'points'
        }
      ];
      setNotifications(defaultNotifications);
      localStorage.setItem('notifications', JSON.stringify(defaultNotifications));
    }
  }, []);

  // Save to localStorage whenever notifications change
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  const unreadCount = notifications.filter(notif => !notif.read).length;

  const markAsRead = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notif => ({ ...notif, read: true }))
    );
  };

  const addNotification = (notification) => {
    const newNotification = {
      ...notification,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast for new notification - using both toast systems for flexibility
    uiToast({
      title: notification.title,
      description: notification.message,
    });
    
    toast(notification.title, {
      description: notification.message,
      position: 'top-right',
    });
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        addNotification
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
