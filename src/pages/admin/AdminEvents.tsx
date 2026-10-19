import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Server, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';
import { dltMessages } from '../../data/adminMockData';

export function AdminEvents() {
  const [isSimulatingAction, setIsSimulatingAction] = useState<string | null>(null);
  const [messages, setMessages] = useState(dltMessages);

  const handleReplay = (id: string) => {
    setIsSimulatingAction(id);
    // Simulate API call
    setTimeout(() => {
      setIsSimulatingAction(null);
      // Remove the message after successful replay simulation
      setMessages(prev => prev.filter(msg => msg.id !== id));
      alert(`Simulated: Message ${id} successfully replayed to topic.`);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Event Logs (Kafka DLT)</h2>
          <p className="text-sm text-muted-foreground">Manage failed asynchronous events and replay messages.</p>
        </div>
      </div>

      <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="font-semibold">Dead Letter Topic (DLT) Alerts</h4>
          <p className="text-sm mt-1 opacity-90">
            There are {messages.length} failed Kafka events requiring manual intervention. Replay actions are currently simulated until the Spring Boot backend is connected.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Failed Events Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {messages.length > 0 ? (
              messages.map((msg) => (
                <div key={msg.id} className="p-4 border rounded-lg bg-card hover:border-primary/30 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded bg-muted flex items-center justify-center flex-shrink-0">
                        <Server className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-semibold">{msg.id}</span>
                          <Badge variant="outline" className="font-mono text-[10px] bg-background">{msg.topic}</Badge>
                          <Badge variant="secondary" className="font-mono text-[10px]">{msg.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Order: <span className="font-medium text-foreground">{msg.orderId}</span> • {msg.timestamp} • {msg.retries} retries
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button 
                        size="sm" 
                        disabled={isSimulatingAction === msg.id}
                        onClick={() => handleReplay(msg.id)}
                      >
                        {isSimulatingAction === msg.id ? (
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <RefreshCw className="h-4 w-4 mr-2" />
                        )}
                        Replay Message
                      </Button>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded text-sm font-mono text-destructive overflow-x-auto border border-destructive/10 whitespace-pre-wrap">
                    Error: {msg.error}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 border rounded-lg border-dashed">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 mb-4">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium">All clear!</h3>
                <p className="text-muted-foreground mt-1">There are no failed events in the Dead Letter Topic.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

