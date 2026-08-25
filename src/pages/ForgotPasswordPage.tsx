import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Mail, ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: 'Correo enviado',
        description: 'Revisa tu bandeja de entrada para continuar.',
      });
      navigate('/login');
    }, 800);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 flex w-full max-w-md flex-col items-center"
      >
        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20">
          <Shield className="h-7 w-7 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">Recuperar contraseña</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          Introduce tu correo electrónico y te enviaremos instrucciones para restablecerla.
        </p>

        <Card className="mt-8 w-full rounded-2xl border border-border bg-card">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Correo electrónico</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu.correo@dxc.com"
                    className="h-11 w-full rounded-xl border border-border bg-background/50 pl-10 pr-4 text-sm text-white placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="mt-2 h-11 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Enviar instrucciones'}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/login')}
                className="h-11 rounded-xl border-border"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a inicio de sesión
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
