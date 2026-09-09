import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, ShieldCheck } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const PARA = [
  { nombre: 'Gonzalez Del Pozo, Leticia (DXC FDS)', email: 'leticia.gonzalez@dxc.com' },
  { nombre: 'Valdes Gago, Maria Aranzazu (DXC FDS)', email: 'maria.valdes@dxc.com' },
  { nombre: 'Villanueva Sanchez, Victoria Pilar (DXC FDS)', email: 'v.villanuevasanchez@dxc.com' },
];
const CC = [
  { nombre: 'Fernandez Fernandez, David (DXC FDS)', email: 'david.fernandez4@dxc.com' },
  { nombre: 'Guinaguazo Cabrera, Luis Alfre (DXC FDS)', email: 'l.guiaguazocabrera@dxc.com' },
  { nombre: 'Popa, Andrei (DXC FDS)', email: 'andrei.popa4@dxc.com' },
  { nombre: 'Camacho Valverde, Enrique (DXC FDS)', email: 'enrique.camacho.valverde@dxc.com' },
];
const CUERPO = `Buenos días,

Se adjunta informe para la gestión de la garantía de una impresora Brother y también imagen de las hojas arrugadas. La impresora se encuentra en el despacho de informática en el Hospital Infanta Leonor, en la planta 0, zona F.`;

export function GarantiasPage() {
  const [inc, setInc] = useState('INC000003842073');
  const [cuerpo, setCuerpo] = useState(CUERPO);
  const ticket = inc.trim().toUpperCase();
  const valido = /^INC\d+$/.test(ticket);
  const asunto = `IMPRESORA BROTHER GARANTÍA. ${ticket}`;
  const pasos = [
    { titulo: 'Sacar el informe de estado de la impresora', texto: 'Obtener el informe de estado y una imagen de las hojas arrugadas para documentar la incidencia.' },
    { titulo: 'Crear el PDF con Gemini', texto: `Preparar el informe en PDF con Gemini y guardarlo con el número INC de la incidencia que corresponda: ${valido ? ticket : 'INC…'}.pdf.` },
    { titulo: 'Adjuntar el informe en FARO', texto: 'Subir el informe en PDF a la incidencia correspondiente en FARO.' },
    { titulo: 'Poner el número de ICM en FARO', texto: 'Registrar el nº de ICM en la incidencia de FARO.' },
    { titulo: 'Escalar a Garantías', texto: 'En el buscador de grupos, escribir GARANTIAS. Seleccionar el grupo que aparece y escalar la incidencia.' },
    { titulo: 'Enviar el correo con el informe adjunto', texto: 'Abrir el correo preconfigurado, revisar los datos y adjuntar el informe en PDF y la imagen de las hojas arrugadas antes de enviarlo.' },
  ];

  const generarCorreo = () => {
    if (!valido) return;
    window.location.href = `mailto:${PARA.map((p) => p.email).join(',')}?cc=${encodeURIComponent(CC.map((p) => p.email).join(','))}&subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo.replace(/\r?\n/g, '\r\n'))}`;
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Link to="/procedimientos" className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Volver a Procedimientos
      </Link>
      <PageHeader icon={ShieldCheck} title="Garantías" description="Procedimiento de gestión de garantía de impresoras Brother" />

      <Card className="rounded-2xl border border-border bg-card">
        <CardContent className="space-y-5 p-6">
          <h2 className="text-lg font-bold text-foreground">Correo preconfigurado</h2>
          <div className="space-y-2">
            <Label htmlFor="garantia-inc">Número de incidencia FARO</Label>
            <Input id="garantia-inc" value={inc} onChange={(event) => setInc(event.target.value.toUpperCase())} placeholder="INC000003842073" aria-invalid={!valido} aria-describedby="garantia-inc-ayuda" />
            <p id="garantia-inc-ayuda" className="text-sm text-muted-foreground">{valido ? 'Cambia el INC por el de la incidencia que corresponda. Se actualizarán el asunto y el nombre del PDF.' : 'Introduce INC seguido del número de incidencia.'}</p>
          </div>
          <dl className="space-y-4 text-sm">
            {[{ etiqueta: 'Para', personas: PARA }, { etiqueta: 'Cc', personas: CC }].map(({ etiqueta, personas }) => (
              <div key={etiqueta}>
                <dt className="mb-1 font-semibold text-foreground">{etiqueta}:</dt>
                <dd className="space-y-1 break-words text-muted-foreground">
                  {personas.map((persona) => <p key={persona.email}>{persona.nombre} &lt;{persona.email}&gt;</p>)}
                </dd>
              </div>
            ))}
            <div><dt className="font-semibold text-foreground">Asunto:</dt><dd className="break-words text-muted-foreground">{asunto}</dd></div>
          </dl>
          <div className="space-y-2">
            <Label htmlFor="garantia-cuerpo">Mensaje</Label>
            <Textarea id="garantia-cuerpo" rows={7} value={cuerpo} onChange={(event) => setCuerpo(event.target.value)} />
            <p className="text-sm text-muted-foreground">Adapta el mensaje si cambia la avería o la ubicación de la impresora.</p>
          </div>
          <Button type="button" onClick={generarCorreo} disabled={!valido} className="h-12 rounded-xl">
            <Mail className="mr-2 h-5 w-5" /> Generar Correo
          </Button>
          <p className="rounded-xl border-l-4 border-primary bg-primary/5 p-4 text-sm text-muted-foreground">Se abrirá tu aplicación de correo con los destinatarios, las copias, el asunto y el mensaje preparados. Adjunta manualmente el informe PDF y la imagen antes de enviar.</p>
        </CardContent>
      </Card>

      <Card className="mt-6 rounded-2xl border border-border bg-card">
        <CardContent className="p-6">
          <h2 className="mb-6 text-lg font-bold text-foreground">Manual del procedimiento</h2>
          <ol className="space-y-5">
            {pasos.map((paso, i) => (
              <li key={paso.titulo} className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{i + 1}</span>
                <div><h3 className="font-semibold text-foreground">{paso.titulo}</h3><p className="mt-1 text-sm text-muted-foreground">{paso.texto}</p></div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </motion.div>
  );
}
