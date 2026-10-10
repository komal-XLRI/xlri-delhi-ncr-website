import type { SustainabilityTeamPage } from '@/types/sustainability-team';

const MEDIA = '/media/sustainability/team';

const portrait = (id: string) => ({ src: `${MEDIA}/${id}.jpg`, width: 512, height: 512 });

/**
 * Sustainability › Team.
 *
 * ## Sources
 *
 * The Delhi-NCR page (xlridelhi.ac.in/sustainability-core-team-2/): the core
 * team with designations, functional areas and profile links, and the Campus
 * Sustainability Committee, as published — including the "Functional Area"
 * entries, which this file does not second-guess. The contact address is the
 * one Delhi's Sustainability menu gives.
 *
 * Names follow the house style ("Fr. Firstname Surname, SJ"); the Delhi page
 * writes "Fr. Alwyn Rodrigues S.J.".
 *
 * Portraits are the page's own, cropped square, self-hosted under
 * public/media/sustainability/team/. Dr. Sanchayan Nath's is the 900×1200
 * original from the Delhi media library (the one his Delhi profile uses); the
 * team page itself shows a 201×163 thumbnail.
 *
 * Two profile links point at the Delhi site's own faculty pages
 * (/wps-members/…); they are written as absolute URLs so they keep working
 * until those profiles move to this site.
 */
export const sustainabilityTeam: SustainabilityTeamPage = {
  title: 'Sustainability Core Team',
  contactEmail: 'sustainability.delhi@xlri.ac.in',
  coreTeam: {
    heading: 'Core Team',
    members: [
      {
        id: 'himanshu-shekhar',
        name: 'Dr. Himanshu Shekhar',
        designation: 'Assistant Professor',
        focus: { label: 'Functional Area', items: ['Strategic Management'] },
        portrait: portrait('himanshu-shekhar'),
        profileHref: 'https://xlri.ac.in/about/full-time-faculty/himanshu-shekhar',
      },
      {
        id: 'kalyan-bhaskar',
        name: 'Dr. Kalyan Bhaskar',
        designation: 'Associate Professor',
        focus: { label: 'Functional Area', items: ['Strategic Management'] },
        portrait: portrait('kalyan-bhaskar'),
        profileHref: 'https://xlri.ac.in/about/full-time-faculty/kalyan-bhaskar',
      },
      {
        id: 'sanchayan-nath',
        name: 'Dr. Sanchayan Nath',
        designation: 'Assistant Professor',
        focus: {
          label: 'Subjects',
          items: ['Sustainability', 'Public policy', 'Circular economy'],
        },
        portrait: portrait('sanchayan-nath'),
        profileHref: 'https://xlridelhi.ac.in/wps-members/dr-sanchayan-nath/',
        facultyId: 'dr-sanchayan-nath',
      },
      {
        id: 'smriti-das',
        name: 'Dr. Smriti Das',
        designation: 'Associate Professor',
        focus: { label: 'Functional Area', items: ['Strategic Management'] },
        portrait: portrait('smriti-das'),
        profileHref: 'https://xlridelhi.ac.in/wps-members/dr-smriti-das/',
        facultyId: 'dr-smriti-das',
      },
      {
        id: 'tata-l-raghu-ram',
        name: 'Dr. Tata L Raghu Ram',
        designation: 'Professor',
        focus: { label: 'Functional Area', items: ['Strategic Management'] },
        portrait: portrait('tata-l-raghu-ram'),
        profileHref: 'https://xlri.ac.in/about/full-time-faculty/tata-raghu-ram',
      },
      {
        id: 'vinayak-ram-tripathi',
        name: 'Dr. Vinayak Ram Tripathi',
        designation: 'Associate Professor',
        focus: { label: 'Functional Area', items: ['Strategic Management'] },
        portrait: portrait('vinayak-ram-tripathi'),
        profileHref: 'https://xlri.ac.in/about/full-time-faculty/vinayak',
      },
    ],
  },
  committee: {
    heading: 'Campus Sustainability Committee',
    members: [
      {
        id: 'sakshi-singhal',
        name: 'Dr. Sakshi Singhal',
        role: 'Convenor',
        facultyId: 'dr-shakshi-singhal',
      },
      {
        id: 'alwyn-rodrigues',
        name: 'Fr. Alwyn Rodrigues, SJ',
        role: 'Member',
        facultyId: 'fr-alwyn-rodrigues-sj',
      },
      { id: 'j-dayal', name: 'Fr. J. Dayal, SJ', role: 'Member' },
      {
        id: 'smriti-das',
        name: 'Dr. Smriti Das',
        role: 'Member',
        coreTeamId: 'smriti-das',
        facultyId: 'dr-smriti-das',
      },
      {
        id: 'madhu-mandal',
        name: 'Dr. Madhu Mandal',
        role: 'Member',
        facultyId: 'dr-madhu-mandal',
      },
      {
        id: 'sanchayan-nath',
        name: 'Dr. Sanchayan Nath',
        role: 'Member',
        coreTeamId: 'sanchayan-nath',
        facultyId: 'dr-sanchayan-nath',
      },
      { id: 'sanjiv-bhatia', name: 'Mr. Sanjiv Bhatia', role: 'Member' },
    ],
  },
};
