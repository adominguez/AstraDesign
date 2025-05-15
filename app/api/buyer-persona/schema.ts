import { z } from 'zod';

// define a schema for the notifications
export const BuyerPersonaSchema = z.object({
  demograficos: z.object({
    nombre: z.string().describe('Nombre ficticio del buyer persona.'),
    edad: z.number().int().describe('Edad aproximada en años.'),
    estudios: z.string().describe('Formación académica o estudios realizados.'),
    ubicacion: z.string().describe('Ciudad o región de residencia.'),
    ingresosAnualesBrutos: z.number().describe('Ingresos brutos anuales.'),
    estadoCivil: z.string().describe('Estado civil (soltero, casado, etc.).'),
  }),
  hogarYFamilia: z.object({
    integrantesFamilia: z.array(z.string()).describe('Integrantes de la unidad familiar.'),
    actividadesOcio: z.array(z.string()).describe('Principales actividades de ocio.'),
    responsabilidadesHogar: z.array(z.string()).describe('Responsabilidades principales en el hogar.'),
  }),
  trabajo: z.object({
    lugarTrabajo: z.string().describe('Empresa o centro donde trabaja.'),
    cargo: z.string().describe('Puesto o cargo desempeñado.'),
    retosLaborales: z.array(z.string()).describe('Retos o desafíos en el ámbito laboral.'),
    influenciaLaboralVidaPersonal: z.string().describe('Cómo influye su trabajo en su vida personal y viceversa.'),
  }),
  comportamiento: z.object({
    relaciones: z.string().describe('Relación con pareja, familia y amigos.'),
    lenguajeGrupoSocial: z.string().describe('Expresiones y estilo de comunicación de su grupo social.'),
  }),
  problema: z.object({
    problemaPrincipal: z.string().describe('Dolor o problema que impulsa la búsqueda de una solución.'),
    solucionProducto: z.string().describe('Cómo el producto o servicio aborda ese problema.'),
  }),
  busquedaSolucion: z.object({
    canalesBusqueda: z.array(z.string()).describe('Dónde busca soluciones (internet, recomendaciones, etc.).'),
    comoEncuentraEmpresa: z.string().describe('Cómo acaba encontrando tu empresa o producto.'),
    reaccionPropuestasComerciales: z.string().describe('Reacción ante las propuestas comerciales.'),
  }),
  objecionesBarreras: z.object({
    barreras: z.array(z.string()).describe('Barreras internas o externas para no comprar o contratar.'),
    excusas: z.array(z.string()).describe('Excusas o alternativas que usa para posponer la compra.'),
  }),
  miedosInseguridades: z.object({
    odiaEncontrar: z.array(z.string()).describe('Qué odia encontrar al buscar información sobre el producto o servicio.'),
  }),
  comparacionCompetencia: z.object({
    factoresComparacion: z.array(z.string()).describe('Factores que compara antes de decidir.'),
    diferenciasCompetencia: z.array(z.string()).describe('Diferencias percibidas con la competencia.'),
    enQueEsMejor: z.array(z.string()).describe('Aspectos en los que tu oferta es mejor.'),
    enQueEsPeor: z.array(z.string()).describe('Aspectos en los que tu oferta es peor.'),
    motivosEleccion: z.string().describe('Por qué elige finalmente tu producto o servicio.'),
  }),
  tuProductoServicio: z.object({
    beneficiosPercibidos: z.array(z.string()).describe('Beneficios o prestaciones percibidos por el buyer persona.'),
    beneficiosNoPercibidos: z.array(z.string()).describe('Beneficios que no percibe o desconoce.'),
    complementarios: z.array(z.string()).describe('Productos o servicios complementarios al principal.'),
    dudasQuejasPostventa: z.array(z.string()).describe('Dudas y quejas habituales en el postventa.'),
  }),
  // Campos opcionales
  avatarUrl: z.string().url().optional().describe('URL de avatar o imagen representativa.'),
  quotes: z.array(z.string()).optional().describe('Frases o testimonios representativos.'),
});

