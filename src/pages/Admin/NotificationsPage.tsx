import React, { useEffect, useState } from "react";
import api from "@/api/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import AdminPageMain from "@/components/custom/AdminPageMain";

type Notification = {
  id: number;
  title: string;
  message: string;
  created_at: string;
};

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearNotifications = async () => {
    if (!confirm("Are you sure you want to clear all notifications?")) return;
    try {
      await api.delete("/notifications/clear");
      setNotifications([]);
    } catch (error) {
      console.error("Failed to clear notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <AdminPageMain title="Notifications" description="">
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <Card className="text-center py-10">
            <CardContent>
              <p className="text-muted-foreground">No notifications yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {notifications.map((notif) => (
              <Card
                key={notif.id}
                className="shadow-sm hover:shadow-md transition-all"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">
                    {notif.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p className="whitespace-pre-line">{notif.message}</p>
                  <p className="text-xs text-gray-400">
                    {formatDistanceToNow(new Date(notif.created_at), {
                      addSuffix: true,
                    })}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
    </AdminPageMain>
  );
};

export default NotificationsPage;
