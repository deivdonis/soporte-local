import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, CheckCircle2, Send } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const STORAGE_KEY = 'soporte-local-sugerencias';

interface SavedSuggestion {
  id: string;
  text: string;
  author: string;
  date: string;
}

export function SugerenciasPage() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState<SavedSuggestion[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSuggestions(parsed);
        }
      } catch {
        setSuggestions([]);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newSuggestion: SavedSuggestion = {
      id: crypto.randomUUID(),
      text: text.trim(),
      author: user?.name ?? 'Anónimo',
      date: new Date().toISOString(),
    };

    const updated = [newSuggestion, ...suggestions];
    setSuggestions(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setText('');
    toast({ title: 'Sugerencia enviada', description: 'Gracias por tu aportación.' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        icon={Lightbulb}
        title="Sugerencias"
        description="Comparte ideas para mejorar el servicio de soporte"
      />

      <Card className="rounded-2xl border border-border bg-card">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Escribe tu sugerencia aquí..."
              className="min-h-[120px] rounded-xl border border-border bg-background/50 text-sm focus-visible:border-primary/50 focus-visible:ring-1 focus-visible:ring-primary/30"
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={!text.trim()}
                className="rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
              >
                <Send className="mr-2 h-4 w-4" />
                Enviar sugerencia
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8 flex flex-col gap-4">
        {suggestions.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">
            Todavía no hay sugerencias registradas.
          </p>
        )}

        {suggestions.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Card className="rounded-2xl border border-border bg-card">
              <CardContent className="flex gap-3 p-5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
                <div>
                  <p className="text-sm text-white">{s.text}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {s.author} · {new Date(s.date).toLocaleString('es-ES')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
