import { routes } from '@/constants/routes';
import type { IcpPage } from '@/types/icp';

/**
 * Executive Education › In-Company Programmes (ICP).
 *
 * ## Sources
 *
 * - **Delhi-NCR page** (xlridelhi.ac.in/icp/): the heading and the seven past
 *   programmes, each with the organisation it was run for. The titles are
 *   verbatim. The hours, batches and participant counts that the Delhi page
 *   writes into the titles are lifted out as `details`; nothing is added.
 *   "Mercedes Benz" is written with its hyphen.
 * - **Photograph**: the MDP Block on the Delhi-NCR campus, the photograph the
 *   Delhi page sets beside the list (2560×1707).
 * - **Contact**: the Delhi-NCR campus phone and email from the Delhi site's
 *   footer. The Delhi page names no ICP office of its own.
 *
 * `summary` describes what the page lists. The Delhi page has no intro text,
 * so it claims nothing beyond the programmes below it.
 */
export const icp: IcpPage = {
  eyebrow: 'XLRI Leadership Education and Development',
  title: 'In-Company Programmes',
  abbreviation: 'ICP',
  summary:
    'Programmes XLRI Delhi-NCR has designed and delivered for individual organisations, from automotive research and manufacturing to the Income Tax Department and Air Headquarters.',
  image: {
    src: '/media/executive-education/icp/icp-mdp-block.jpg',
    width: 2560,
    height: 1707,
    alt: 'The MDP Block at the XLRI Delhi-NCR campus, a tall pale concrete wall under a blue sky, with young trees and a visitor parking sign in front',
  },
  clients: [
    { id: 'mercedes', name: 'Mercedes-Benz R&D India', sector: 'industry' },
    { id: 'hyundai', name: 'Hyundai Motors', sector: 'industry' },
    { id: 'denso', name: 'Denso India', sector: 'industry' },
    { id: 'income-tax', name: 'Department of Income Tax', sector: 'government' },
    { id: 'air-hq', name: 'Air Headquarters', sector: 'government' },
  ],
  programmes: {
    heading: 'Past Programmes',
    items: [
      {
        id: 'advanced-product-management',
        title: 'Advanced Product Management Program',
        audience: 'for Mercedes-Benz R&D India',
        client: 'mercedes',
        details: ['48 hours'],
      },
      {
        id: 'fundamentals-product-management',
        title: 'Fundamentals of Product Management Program',
        audience: 'for Mercedes-Benz R&D India',
        client: 'mercedes',
        details: ['18 hours'],
      },
      {
        id: 'emotional-intelligence-denso',
        title: 'Program on Emotional Intelligence',
        audience: 'for executives of Denso India',
        client: 'denso',
        details: [],
      },
      {
        id: 'analytics-hr',
        title: 'Analytics for HR Professionals Program',
        audience: 'IRS officers of the Department of Income Tax',
        client: 'income-tax',
        details: ['3 batches', '53 participants'],
      },
      {
        id: 'transformational-leadership',
        title: 'Transformational Leadership Program',
        audience: 'for the Department Heads of Hyundai Motors',
        client: 'hyundai',
        details: [],
      },
      {
        id: 'emotional-intelligence-air-hq',
        title: 'Program on Emotional Intelligence',
        audience: 'for Air Headquarters',
        client: 'air-hq',
        details: [],
      },
      {
        id: 'aiml-hr-finance',
        title: 'Leveraging AIML for Digital Transformation of the HR & Finance functions Program',
        audience: 'for Mercedes-Benz R&D India',
        client: 'mercedes',
        details: ['47 participants'],
      },
    ],
  },
  related: [
    {
      id: 'emdp',
      label: 'Executive Management Development Programmes',
      text: 'Longer certificate programmes for working professionals.',
      href: routes.executiveEducation.programme('emdp'),
    },
    {
      id: 'mdp',
      label: 'Management Development Programmes',
      text: 'Short, intensive, open programmes on campus.',
      href: routes.executiveEducation.programme('management-development-programmes'),
    },
  ],
  contact: {
    heading: 'Plan a programme for your organisation',
    text: 'To discuss an in-company programme, contact XLRI Delhi-NCR.',
    phone: '01251-271111',
    email: 'info.delhi@xlri.ac.in',
  },
};
