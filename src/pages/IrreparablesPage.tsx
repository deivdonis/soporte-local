import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Download, Printer, X, Mail } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface IrreparableForm {
  ticketFaroNumeros: string;
  tipoEquipo: string;
  marca: string;
  modelo: string;
  numeroSerie: string;
  sap: string;
  fechaBaja: string;
  motivos: string[];
}

const TIPOS_EQUIPO = ['Impresora', 'Pistola', 'Portátil', 'Ordenador', 'Monitor', 'Servidor', 'Teléfono', 'Otro'];

const MARCAS_COMUNES = {
  'Impresora': ['Brother', 'HP', 'Canon', 'Xerox', 'Ricoh', 'Otros'],
  'Pistola': ['Motorola', 'Otros'],
  'Portátil': ['HP', 'Lenovo', 'Dell', 'Toshiba', 'Fujitsu', 'Otros'],
  'Ordenador': ['HP', 'Lenovo', 'Dell', 'Otros'],
  'Monitor': ['HP', 'Dell', 'LG', 'Samsung', 'Otros'],
  'Servidor': ['HP', 'Dell', 'Lenovo', 'Otros'],
  'Teléfono': ['Cisco', 'Otros'],
  'Otro': ['Otros'],
};

const MODELOS_POR_MARCA: Record<string, string[]> = {
  'Brother': ['5250DN', 'L8360CDW', 'HL-L2350DW', 'Otros'],
  'HP': ['LaserJet Pro', 'OfficeJet', 'EliteBook', 'ProDesk', 'Otros'],
  'Canon': ['imagePRUNNER', 'LBP', 'Otros'],
  'Motorola': ['MC9090', 'MC9200', 'Otros'],
  'Lenovo': ['ThinkPad', 'ThinkCentre', 'Otros'],
  'Dell': ['Inspiron', 'Latitude', 'OptiPlex', 'Otros'],
  'Toshiba': ['Satellite', 'Tecra', 'Otros'],
  'Fujitsu': ['LifeBook', 'Otros'],
  'Xerox': ['VersaLink', 'AltaLink', 'Otros'],
  'Ricoh': ['MP', 'Otros'],
  'LG': ['Otros'],
  'Samsung': ['Otros'],
  'Cisco': ['8851', 'Otros'],
};

const MOTIVOS = [
  'Obsolescencia',
  'Fusor averiado',
  'Componente crítico dañado',
  'Pantalla rota',
  'Teclado defectuoso',
  'Batería muerta',
  'Placa base dañada',
];

function generatePDFContent(data: IrreparableForm): string {
  const ticketCompleto = `INC00000${data.ticketFaroNumeros}`;
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
          <div class="field-value">${ticketCompleto}</div>
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
        <div class="section-title">MOTIVO DE IRREPARABILIDAD</div>
        <div class="motivos">
          ${data.motivos.map((m, i) => `<div class="motivo-item"><strong>${i + 1}.</strong> ${m}</div>`).join('')}
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
    ticketFaroNumeros: '',
    tipoEquipo: '',
    marca: '',
    modelo: '',
    numeroSerie: '',
    sap: '',
    fechaBaja: new Date().toISOString().split('T')[0],
    motivos: [''],
  });
  const [preview, setPreview] = useState(false);
  const [pdfContent, setPdfContent] = useState('');

  const handleChange = (field: keyof Omit<IrreparableForm, 'motivos'>, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleMotivoChange = (index: number, value: string) => {
    const newMotivos = [...form.motivos];
    newMotivos[index] = value;
    setForm((prev) => ({ ...prev, motivos: newMotivos }));
  };

  const handleAddMotivo = () => {
    setForm((prev) => ({ ...prev, motivos: [...prev.motivos, ''] }));
  };

  const handleRemoveMotivo = (index: number) => {
    setForm((prev) => ({
      ...prev,
      motivos: prev.motivos.filter((_, i) => i !== index),
    }));
  };

  const getMarcasDisponibles = (): string[] => {
    return (MARCAS_COMUNES[form.tipoEquipo as keyof typeof MARCAS_COMUNES] || ['Otros']) as string[];
  };

  const getModelosDisponibles = (): string[] => {
    if (form.marca === 'Otros' || !form.marca) return ['Otros'];
    return (MODELOS_POR_MARCA[form.marca] || ['Otros']) as string[];
  };

  const validateForm = (): boolean => {
    if (!form.ticketFaroNumeros.trim()) {
      toast({ title: 'Error', description: 'Números de ticket FARO son obligatorios' });
      return false;
    }
    if (!form.tipoEquipo) {
      toast({ title: 'Error', description: 'Tipo de equipo es obligatorio' });
      return false;
    }
    if (!form.marca || form.marca === 'Otros' && !form.marca) {
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
    if (!form.motivos[0]?.trim()) {
      toast({ title: 'Error', description: 'Al menos 1 motivo es obligatorio' });
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
    const ticketCompleto = `IRREPARABLE_INC00000${form.ticketFaroNumeros}`;
    downloadPDF(pdfContent, ticketCompleto);
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
    const ticketCompleto = `INC00000${form.ticketFaroNumeros}`;
    return `Buenos días,

Se adjunta informe de irreparable

Los datos del equipo son:
Tipo: ${form.tipoEquipo}
Marca: ${form.marca}
Modelo: ${form.modelo}
Número de Serie: ${form.numeroSerie}
SAP: ${form.sap}

Motivo de irreparabilidad:
${form.motivos.map((m, i) => `${i + 1}. ${m}`).join('\n')}

Saludos`;
  };

  const handleOpenOutlook = () => {
    const emailBody = generateEmailBody();
    const subject = encodeURIComponent(`IRREPARABLE INC00000${form.ticketFaroNumeros}`);
    const body = encodeURIComponent(emailBody);
    const mailtoLink = `mailto:irreparable_MD@dxc.com?cc=david.fernandez4@dxc.com,l.guiaguazocabrera@dxc.com,andrei.popa4@dxc.com,enrique.camacho.valverde@dxc.com&subject=${subject}&body=${body}`;
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
        description="Generar informe de equipo irreparable"
      />

      {!preview ? (
        <Card className="rounded-2xl border border-border bg-card">
          <CardContent className="p-6">
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="ticketFaro">Nº Ticket FARO *</Label>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="rounded-lg border border-border bg-background/50 px-3 py-2.5 text-sm font-medium text-muted-foreground">INC00000</span>
                    <Input
                      id="ticketFaro"
                      value={form.ticketFaroNumeros}
                      onChange={(e) => handleChange('ticketFaroNumeros', e.target.value.replace(/\D/g, ''))}
                      placeholder="ej: 2059839"
                      className="flex-1"
                      maxLength={7}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="tipoEquipo">Tipo de Equipo *</Label>
                  <select
                    id="tipoEquipo"
                    value={form.tipoEquipo}
                    onChange={(e) => {
                      handleChange('tipoEquipo', e.target.value);
                      handleChange('marca', '');
                      handleChange('modelo', '');
                    }}
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
                  <select
                    id="marca"
                    value={form.marca}
                    onChange={(e) => {
                      handleChange('marca', e.target.value);
                      handleChange('modelo', '');
                    }}
                    className="mt-1.5 h-11 w-full rounded-xl border border-border bg-background/50 px-4 text-sm text-white focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
                    disabled={!form.tipoEquipo}
                  >
                    <option value="">Seleccionar marca...</option>
                    {getMarcasDisponibles().map((marca) => (
                      <option key={marca} value={marca} className="bg-card">
                        {marca}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="modelo">Modelo *</Label>
                  {form.marca === 'Otros' ? (
                    <Input
                      id="modelo"
                      value={form.modelo}
                      onChange={(e) => handleChange('modelo', e.target.value)}
                      placeholder="Escribir modelo..."
                      className="mt-1.5"
                    />
                  ) : (
                    <select
                      id="modelo"
                      value={form.modelo}
                      onChange={(e) => handleChange('modelo', e.target.value)}
                      className="mt-1.5 h-11 w-full rounded-xl border border-border bg-background/50 px-4 text-sm text-white focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
                      disabled={!form.marca}
                    >
                      <option value="">Seleccionar modelo...</option>
                      {getModelosDisponibles().map((modelo) => (
                        <option key={modelo} value={modelo} className="bg-card">
                          {modelo}
                        </option>
                      ))}
                    </select>
                  )}
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
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">Motivo *</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddMotivo}
                    className="h-8 text-xs"
                  >
                    + Añadir motivo
                  </Button>
                </div>

                <div className="space-y-3">
                  {form.motivos.map((motivo, index) => (
                    <div key={index} className="flex gap-2">
                      <select
                        value={motivo}
                        onChange={(e) => handleMotivoChange(index, e.target.value)}
                        className="flex-1 rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm text-white focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
                      >
                        <option value="">Seleccionar motivo...</option>
                        {MOTIVOS.map((m) => (
                          <option key={m} value={m} className="bg-card">
                            {m}
                          </option>
                        ))}
                        <option value="" disabled className="bg-card">---</option>
                        <option value="Escribir a mano" className="bg-card italic">Escribir a mano...</option>
                      </select>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMotivo(index)}
                          className="flex h-11 w-11 items-center justify-center rounded-xl border border-border text-muted-foreground hover:border-red-500/30 hover:text-red-400"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  {form.motivos.some((m) => m === 'Escribir a mano') && (
                    <Input
                      type="text"
                      placeholder="Escribe el motivo personalizado..."
                      className="mt-2"
                      onBlur={(e) => {
                        const text = e.target.value;
                        if (text.trim()) {
                          const idx = form.motivos.findIndex((m) => m === 'Escribir a mano');
                          if (idx !== -1) handleMotivoChange(idx, text);
                        }
                      }}
                    />
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setForm({
                      ticketFaroNumeros: '',
                      tipoEquipo: '',
                      marca: '',
                      modelo: '',
                      numeroSerie: '',
                      sap: '',
                      fechaBaja: new Date().toISOString().split('T')[0],
                      motivos: [''],
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
              onClick={handleOpenOutlook}
              variant="outline"
              className="rounded-xl"
            >
              <Mail className="mr-2 h-4 w-4" />
              Abrir Outlook
            </Button>
          </div>

          <Card className="rounded-2xl border border-border bg-background/30">
            <CardContent className="p-4 text-sm text-muted-foreground">
              <h3 className="mb-2 font-semibold text-white">Próximos pasos en CESUS/FARO:</h3>
              <ol className="space-y-1 pl-5 list-decimal">
                <li>Adjuntar este informe en nota tipo Seguimiento CESUS</li>
                <li>Seleccionar Categoría de resolución: <strong>IRREPARABLE</strong></li>
                <li>Cerrar con Resolución autom. Notificada</li>
                <li>Se enviará correo a irreparable_MD@dxc.com con copia a compañeros</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      )}
    </motion.div>
  );
}
