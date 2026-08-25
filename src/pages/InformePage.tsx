import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const STORAGE_KEY = 'soporte-local-informe-email';

const RECIPIENTS = [
  'soporte.it@dxc.com',
  'coordinacion.hospital@dxc.com',
  'direccion.tecnica@dxc.com',
  'administracion@dxc.com',
];

const DEFAULT_TO = RECIPIENTS[0];

interface InformeDraft {
  to: string;
  subject: string;
  body: string;
}

function loadDraft(): InformeDraft {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return { to: DEFAULT_TO, subject: '', body: '' };
    }
  }
  return { to: DEFAULT_TO, subject: '', body: '' };
}

export function InformePage() {
  // NOTE: intentionally loads the persisted draft via a lazy useState
  // initializer instead of a useEffect (matches the spec verbatim).
  const [to, setTo] = useState<string>(() => loadDraft().to);
  const [subject, setSubject] = useState<string>(() => loadDraft().subject);
  const [body, setBody] = useState<string>(() => loadDraft().body);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ to, subject, body }));
  }, [to, subject, body]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        icon={Mail}
        title="Informe mensual"
        description="Redacta y envía el informe mensual por correo"
      />

      <Card className="mx-auto max-w-3xl rounded-2xl border border-border bg-card">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="to">Destinatario</Label>
              <select
                id="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="h-11 w-full rounded-xl border border-border bg-background/50 px-4 text-sm text-white focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
              >
                {RECIPIENTS.map((r) => (
                  <option key={r} value={r} className="bg-card text-white">
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="subject">Asunto</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Informe mensual de soporte - Agosto 2026"
                className="h-11 rounded-xl border border-border bg-background/50 text-sm focus-visible:border-primary/50 focus-visible:ring-1 focus-visible:ring-primary/30"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="body">Cuerpo</Label>
              <Textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Escribe aquí el contenido del informe..."
                className="min-h-[220px] rounded-xl border border-border bg-background/50 text-sm focus-visible:border-primary/50 focus-visible:ring-1 focus-visible:ring-primary/30"
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
              >
                <Send className="mr-2 h-4 w-4" />
                Enviar por correo (Outlook)
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
