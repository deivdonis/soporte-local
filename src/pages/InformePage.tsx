import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileBarChart, ExternalLink } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SHAREPOINT_URL = 'https://dxcportal.sharepoint.com/sites/SoporteTecnicoMD/';

export function InformePage() {
  // Redirigir automáticamente a SharePoint
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = SHAREPOINT_URL;
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        icon={FileBarChart}
        title="Informe mensual"
        description="Acceso directo al portal SharePoint de Soporte Técnico"
      />

      <Card className="mx-auto max-w-2xl rounded-2xl border border-border bg-card">
        <CardContent className="p-6 text-center">
          <p className="mb-6 text-sm text-muted-foreground">
            Te redirigimos automáticamente al portal de SharePoint en 2 segundos...
          </p>
          <Button asChild className="rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90">
            <a href={SHAREPOINT_URL} target="_blank" rel="noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Ir al portal ahora
            </a>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
