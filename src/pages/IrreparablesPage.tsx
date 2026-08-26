import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Download, Printer, X } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface IrreparableForm {
  ticketFaro: string;
  tipoEquipo: string;
  marca: string;
  modelo: string;
  numeroSerie: string;
  sap: string;
  fechaBaja: string;
  motivo1: string;
  motivo2: string;
  motivo3: string;
}

const TIPOS_EQUIPO = ['Impresora', 'Pistola', 'Portátil', 'Monitor', 'Servidor', 'Telefono', 'Otro'];
const MOTIVOS = [
  'Obsolescencia',
  'Fusor averiado',
  'Componente crítico dañado',
  'Pantalla rota',
  'Teclado defectuoso',
  'Batería muerta',
  'Placa base dañada',
  'Otro',
];

function generatePDFContent(data: IrreparableForm): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 15px; }
        .header h1 { margin: 0; font-size: 24px; color: #333; }
        .header p { margin: 5px 0; color: #666; }
        .section { margin: 25px 0; }
        .section-title { font-size: 14px; font-weight: bold; color: #fff; background: #333; padding: 8px 12px; margin-bottom: 10px; }
        .field { margin: 12px 0; }
        .field-label { font-weight: bold; color: #333; font-size: 12px; }
        .field-value { color: #555; margin-top: 3px; padding: 8px; background: #f5f5f5; border-left: 3px solid #0066cc; }
        .motivos { display: flex; flex-direction: column; gap: 8px; }
        .motivo-item { padding: 8px; background: #fff3cd; border-left: 3px solid #ff9800; }
        .footer { margin-top: 40px; padding-top: 15px; border-top: 1px solid #ccc; font-size: 11px; color: #666; text-align: center; }
        @media print { body { margin: 0; } }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>INFORME DE IRREPARABILIDAD</h1>
        <p>Sanidad - Procedimiento de Equipos Irreparables</p>
      </div>

      <div class="section">
        <div class="section-title">DATOS DEL INCIDENTE</div>
        <div class="field">
          <div class="field-label">Nº Ticket FARO:</div>
          <div class="field-value">${data.ticketFaro}</div>
        </div>
        <div class="field">
          <div class="field-label">Fecha de Baja:</div>
          <div class="field-value">${new Date(data.fechaBaja).toLocaleDateString('es-ES')}</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">EQUIPO AFECTADO</div>
        <div class="field">
          <div class="field-label">Tipo de Equipo:</div>
          <div class="field-value">${data.tipoEquipo}</div>
        </div>
        <div class="field">
          <div class="field-label">Marca:</div>
          <div class="field-value">${data.marca}</div>
        </div>
        <div class="field">
          <div class="field-label">Modelo:</div>
          <div class="field-value">${data.modelo}</div>
        </div>
        <div class="field">
          <div class="field-label">Número de Serie:</div>
          <div class="field-value">${data.numeroSerie}</div>
        </div>
        <div class="field">
          <div class="field-label">SAP:</div>
          <div class="field-value">${data.sap}</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">MOTIVO DE IRREPARABILIDAD (3 PUNTOS)</div>
        <div class="motivos">
          <div class="motivo-item"><strong>1.</strong> ${data.motivo1}</div>
          <div class="motivo-item"><strong>2.</strong> ${data.motivo2}</div>
          <div class="motivo-item"><strong>3.</strong> ${data.motivo3}</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">PRÓXIMOS PASOS</div>
        <div class="field">
          <div class="field-value">
            1. Adjuntar este informe en nota tipo Seguimiento CESUS<br>
            2. Seleccionar categoría de resolución: IRREPARABLE<br>
            3. Cerrar con Resolución autom. Notificada<br>
            4. Notificar a irreparable_MD@dxc.com
          </div>
        </div>
      </div>

      <div class="footer">
        <p>Informe generado el ${new Date().toLocaleDateString('es-ES')} a las ${new Date().toLocaleTimeString('es-ES')}</p>
      </div>
    </body>
    </html>
  `;
}

function downloadPDF(htmlContent: string, filename: string) {
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function IrreparablesPage() {
  const { toast } = useToast();
  const [form, setForm] = useState<IrreparableForm>({
    ticketFaro: '',
    tipoEquipo: '',
    marca: '',
    modelo: '',
    numeroSerie: '',
    sap: '',
    fechaBaja: new Date().toISOString().split('T')[0],
    motivo1: '',
    motivo2: '',
    motivo3: '',
  });
  const [preview, setPreview] = useState(false);
  const [pdfContent, setPdfContent] = useState('');

  const handleChange = (field: keyof IrreparableForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    if (!form.ticketFaro.trim()) {
      toast({ title: 'Error', description: 'Nº Ticket FARO es obligatorio' });
      return false;
    }
    if (!form.tipoEquipo) {
      toast({ title: 'Error', description: 'Tipo de equipo es obligatorio' });
      return false;
    }
    if (!form.marca.trim()) {
      toast({ title: 'Error', description: 'Marca es obligatoria' });
      return false;
    }
    if (!form.modelo.trim()) {
      toast({ title: 'Error', description: 'Modelo es obligatorio' });
      return false;
    }
    if (!form.numeroSerie.trim()) {
      toast({ title: 'Error', description: 'Número de Serie es obligatorio' });
      return false;
    }
    if (!form.motivo1 || !form.motivo2 || !form.motivo3) {
      toast({ title: 'Error', description: 'Los 3 puntos de motivo son obligatorios' });
      return false;
    }
    return true;
  };

  const handleGeneratePDF = () => {
    if (!validateForm()) return;
    const content = generatePDFContent(form);
    setPdfContent(content);
    setPreview(true);
  };

  const handleDownloadPDF = () => {
    downloadPDF(pdfContent, `IRREPARABLE_${form.ticketFaro}`);
    toast({ title: 'Descargado', description: 'PDF descargado correctamente' });
  };

  const handlePrintPDF = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.write(pdfContent);
      printWindow.document.close();
      setTimeout(() => printWindow.print(), 250);
    }
  };

  const generateEmailBody = (): string => {
    return `Buenos días,

Se adjunta informe de irreparable

Los datos del equipo son:
Tipo: ${form.tipoEquipo}
Marca: ${form.marca}
Modelo: ${form.modelo}
Número de Serie: ${form.numeroSerie}
SAP: ${form.sap}

Motivo de irreparabilidad:
1. ${form.motivo1}
2. ${form.motivo2}
3. ${form.motivo3}

Saludos`;
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
        description="Generar informe de equipo irreparable"
      />

      {!preview ? (
        <Card className="rounded-2xl border border-border bg-card">
          <CardContent className="p-6">
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="ticketFaro">Nº Ticket FARO *</Label>
                  <Input
                    id="ticketFaro"
                    value={form.ticketFaro}
                    onChange={(e) => handleChange('ticketFaro', e.target.value)}
                    placeholder="ej: INC000002059839"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="tipoEquipo">Tipo de Equipo *</Label>
                  <select
                    id="tipoEquipo"
                    value={form.tipoEquipo}
                    onChange={(e) => handleChange('tipoEquipo', e.target.value)}
                    className="mt-1.5 h-11 w-full rounded-xl border border-border bg-background/50 px-4 text-sm text-white focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
                  >
                    <option value="">Seleccionar tipo...</option>
                    {TIPOS_EQUIPO.map((tipo) => (
                      <option key={tipo} value={tipo} className="bg-card">
                        {tipo}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="marca">Marca *</Label>
                  <Input
                    id="marca"
                    value={form.marca}
                    onChange={(e) => handleChange('marca', e.target.value)}
                    placeholder="ej: Brother"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="modelo">Modelo *</Label>
                  <Input
                    id="modelo"
                    value={form.modelo}
                    onChange={(e) => handleChange('modelo', e.target.value)}
                    placeholder="ej: 5250DN"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="numeroSerie">Número de Serie *</Label>
                  <Input
                    id="numeroSerie"
                    value={form.numeroSerie}
                    onChange={(e) => handleChange('numeroSerie', e.target.value)}
                    placeholder="ej: E63659A8J435165"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="sap">SAP</Label>
                  <Input
                    id="sap"
                    value={form.sap}
                    onChange={(e) => handleChange('sap', e.target.value)}
                    placeholder="ej: NO o código SAP"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="fechaBaja">Fecha de Baja *</Label>
                  <Input
                    id="fechaBaja"
                    type="date"
                    value={form.fechaBaja}
                    onChange={(e) => handleChange('fechaBaja', e.target.value)}
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div className="space-y-4 rounded-xl border border-border bg-background/30 p-4">
                <h3 className="font-semibold text-white">Motivo de Irreparabilidad (3 puntos obligatorios)</h3>

                {[
                  { key: 'motivo1', label: 'Punto 1' },
                  { key: 'motivo2', label: 'Punto 2' },
                  { key: 'motivo3', label: 'Punto 3' },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <Label htmlFor={key}>
                      {label} *
                    </Label>
                    <select
                      id={key}
                      value={form[key as keyof IrreparableForm]}
                      onChange={(e) => handleChange(key as keyof IrreparableForm, e.target.value)}
                      className="mt-1.5 h-11 w-full rounded-xl border border-border bg-background/50 px-4 text-sm text-white focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
                    >
                      <option value="">Seleccionar motivo...</option>
                      {MOTIVOS.map((motivo) => (
                        <option key={motivo} value={motivo} className="bg-card">
                          {motivo}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setForm({
                      ticketFaro: '',
                      tipoEquipo: '',
                      marca: '',
                      modelo: '',
                      numeroSerie: '',
                      sap: '',
                      fechaBaja: new Date().toISOString().split('T')[0],
                      motivo1: '',
                      motivo2: '',
                      motivo3: '',
                    });
                  }}
                  className="rounded-xl"
                >
                  Limpiar
                </Button>
                <Button
                  type="button"
                  onClick={handleGeneratePDF}
                  className="rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Generar Informe
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">
            <h2 className="text-lg font-bold text-white">Previsualización del Informe</h2>
            <button
              onClick={() => setPreview(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:border-primary/30 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <Card className="rounded-2xl border border-border bg-card">
            <CardContent className="p-0">
              <iframe
                srcDoc={pdfContent}
                className="h-[600px] w-full rounded-2xl border-0"
              />
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-3">
            <Button onClick={handleDownloadPDF} className="rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90">
              <Download className="mr-2 h-4 w-4" />
              Descargar PDF
            </Button>
            <Button onClick={handlePrintPDF} variant="outline" className="rounded-xl">
              <Printer className="mr-2 h-4 w-4" />
              Imprimir
            </Button>
            <Button
              onClick={() => {
                const emailBody = generateEmailBody();
                const subject = encodeURIComponent(`IRREPARABLE ${form.ticketFaro}`);
                const body = encodeURIComponent(emailBody);
                const mailtoLink = `mailto:irreparable_MD@dxc.com?cc=david.fernandez4@dxc.com,l.guiaguazocabrera@dxc.com,andrei.popa4@dxc.com,enrique.camacho.valverde@dxc.com&subject=${subject}&body=${body}`;
                window.location.href = mailtoLink;
              }}
              variant="outline"
              className="rounded-xl"
            >
              Enviar por Correo
            </Button>
          </div>

          <Card className="rounded-2xl border border-border bg-background/30">
            <CardContent className="p-4 text-sm text-muted-foreground">
              <h3 className="mb-2 font-semibold text-white">Próximos pasos en CESUS/FARO:</h3>
              <ol className="space-y-1 pl-5 list-decimal">
                <li>Adjuntar este informe en nota tipo Seguimiento CESUS</li>
                <li>Seleccionar Categoría de resolución: <strong>IRREPARABLE</strong></li>
                <li>Cerrar con Resolución autom. Notificada</li>
                <li>Enviar correo a irreparable_MD@dxc.com con copia a compañeros</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      )}
    </motion.div>
  );
}
