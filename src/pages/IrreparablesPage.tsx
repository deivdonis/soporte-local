import { motion } from 'framer-motion';
import { AlertTriangle, FileDown, Mail, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const PLANTILLA_URL = `${import.meta.env.BASE_URL}plantillas/IRREPARABLES_PLANTILLA_ORIGINAL.doc`;

const DESTINATARIO = 'irreparable_MD@dxc.com';
const COPIA = [
  'david.fernandez4@dxc.com',
  'l.guiaguazocabrera@dxc.com',
  'andrei.popa4@dxc.com',
  'enrique.camacho.valverde@dxc.com',
].join(',');

const CUERPO_CORREO = `Buenos días,

Máquina irreparable según procedimiento.
Tipo:
Marca:
Modelo:
Número de Serie:
Nº sap:

Saludos`;

const PASOS_MANUAL = [
  {
    title: 'Realizar el informe de irreparabilidad "IRREPARABLES PLANTILLA NUEVA(IRREPARABLE INCXXXXXXX)"',
    description: `en PDF con los 3 puntos obligatorios:

EJEMPLO:

IMPRESORA IRREPARABLE POR OBSOLESCENCIA.
FUSOR AVERIADO
USUARIO OPERATIVO
CONECTADA EN LOCAL.

NOTA:
AL RELLENAR EL WORD NO OLVIDAR CAMBIAR EL Nº ticket FARO: INC000002056490
EL NOMBRE DEL PDF HA DE SER  IRREPARABLE INCXXXXXXX
Recuerda cumplimentar la fecha del día en que se da de baja el material.`,
  },
  {
    title: 'Añadimos una nota tipo Seguimiento CESUS',
    description: `adjuntando el informe de irreparabilidad EN PDF y el siguiente comentario:

Máquina irreparable según procedimiento.
Tipo: Impresora
Marca: Brother
Modelo: 5250DN
Número de Serie: E63659A8J435165
Nº sap: NO`,
  },
  {
    title: 'En Categoría de resolución',
    description: 'Seleccionamos IRREPARABLE y el activo afectado.',
  },
  {
    title: 'Cerramos con Resolución autom. Notificada',
    description: `con el comentario:

#:2PRE Máquina irreparable según procedimiento.
MARCA:
MODELO:
NUMERO DE SERIE:
SAP:`,
  },
  {
    title: 'Enviar un correo a IRREPARABLE_MD@DXC.COM con:',
    description: `Asunto:
IRREPARABLE INCXXXXXXX

Adjuntar el informe:
y los 4 puntos del motivo en el cuerpo del mensaje.

Buenos días,

Se adjunta informe de irreparable
Los datos del equipo son:
MARCA:
MODELO:
NUMERO DE SERIE:
SAP:

Saludos`,
  },
];

export function IrreparablesPage() {
  const { toast } = useToast();

  const handleDescargarPlantilla = () => {
    const link = document.createElement('a');
    link.href = PLANTILLA_URL;
    link.download = 'IRREPARABLES_PLANTILLA.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.open(PLANTILLA_URL, '_blank');

    toast({ title: 'Plantilla descargada', description: 'Si no se ha abierto automáticamente, ábrela desde tus descargas' });
  };

  const handleGenerarCorreo = () => {
    const subject = encodeURIComponent('IRREPARABLE - Máquina irreparable según procedimiento');
    const body = encodeURIComponent(CUERPO_CORREO);
    const mailtoLink = `mailto:${DESTINATARIO}?cc=${COPIA}&subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        icon={AlertTriangle}
        title="Irreparables"
        description="Procedimiento de equipos irreparables"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Button
          type="button"
          onClick={handleDescargarPlantilla}
          className="h-16 rounded-xl bg-primary text-base text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
        >
          <FileDown className="mr-2 h-5 w-5" />
          Descargar Plantilla
        </Button>
        <Button
          type="button"
          onClick={handleGenerarCorreo}
          variant="outline"
          className="h-16 rounded-xl text-base"
        >
          <Mail className="mr-2 h-5 w-5" />
          Generar Correo
        </Button>
      </div>

      <Card className="mt-6 rounded-2xl border border-border bg-card">
        <CardContent className="p-6">
          <h2 className="mb-6 text-lg font-bold text-white">Manual del procedimiento</h2>
          <div className="space-y-5">
            {PASOS_MANUAL.map((paso, i) => (
              <div key={paso.title} className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{paso.title}</h3>
                  <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">{paso.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-start gap-2 rounded-xl border-l-4 border-primary bg-primary/5 p-4">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p className="text-xs text-muted-foreground">
              Destinatario: <strong className="text-white">{DESTINATARIO}</strong> · Copia: compañeros del equipo de soporte
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
