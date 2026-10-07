import type { Leadership } from '@/types/leadership';

/**
 * "Leadership & Administration" content.
 *
 * From the Delhi-NCR page (xlridelhi.ac.in/about-xlri/leadership-administration/):
 * the three leaders shown at its head, and the full "XLRI Councils & Committees
 * for 2025-2026" listing beneath them.
 *
 * ## The committee listing is generated, not retyped
 *
 * Roughly 250 lines of names — transcribing them by hand would guarantee errors.
 * They were parsed from the published page and emitted here verbatim, including
 * its inconsistent capitalisation and spellings ("Sakhhi", "Mukheerjee",
 * "Srimannarayan" / "Srimannarayana"); correcting a name is the communications
 * team's call, not ours. The page renders headings in uppercase, so the mixed
 * case of the source does not show.
 *
 * Three mechanical changes only: list numbers are dropped (the page renders an
 * ordered list, which also fixes D1, numbered 1–6, 6, 7, 8, 7, 8 at source); in
 * D2 "Kapoor" had a Cyrillic “р” in place of the Latin “p”, which would break
 * search; and Jesuit names follow one house style, "Fr. Firstname Surname, SJ",
 * where the source mixed "Fr" / "Fr." and "SJ" / "S.J." (the same rule is
 * applied on From the Director's Desk).
 *
 * Portraits: the Director's is the one on From the Director's Desk; the Deans'
 * are the Delhi site's 900×1200 originals re-encoded as JPEG.
 */
export const leadership: Leadership = {
  title: 'Leadership & Administration',

  coreTeam: {
    heading: 'Core Team',
    leaders: [
      {
        id: 'antony-uvari',
        name: 'Fr. Antony R Uvari, SJ',
        role: 'Director',
        portrait: { src: '/media/leadership/fr-antony-uvari.jpg', width: 900, height: 1200 },
      },
      {
        id: 'alwyn-rodrigues',
        name: 'Fr. Alwyn Rodrigues, SJ',
        role: 'Dean (Admin & Finance)',
        portrait: { src: '/media/leadership/fr-alwyn-rodrigues.jpg', width: 900, height: 1200 },
      },
      {
        id: 'munish-kumar-thakur',
        name: 'Dr. Munish Kumar Thakur',
        role: 'Dean (Academics)',
        portrait: { src: '/media/leadership/dr-munish-kumar-thakur.jpg', width: 900, height: 1200 },
      },
    ],
  },

  committees: {
    heading: 'XLRI Councils & Committees for 2025-2026',
    groups: [
      {
        code: 'A',
        title: 'COUNCILS & COMMITTEES',
        tabLabel: 'Councils',
        committees: [
          {
            code: 'A1',
            name: 'EXECUTIVE COUNCIL',
            members: [
              {
                role: 'Director',
                name: 'Fr. Antony R Uvari, SJ (Convenor)',
              },
              {
                role: 'Dean (Academics)',
                name: 'Munish Thakur',
              },
              {
                role: 'Dean(Administration & Finance)',
                name: 'Fr. Alwyn Rodrigues, SJ',
              },
              {
                role: 'Administrator',
                name: 'Fr. J. Dayal, SJ',
              },
              {
                role: 'Associate Dean (Academics)',
                name: 'Dr. N. Rajkumar',
              },
              {
                role: 'Associate Dean (Executive Education)',
                name: 'Dr. M. Srimannarayan',
              },
              {
                role: 'Faculty Representative',
                name: 'Dr. Gourav Vallabh',
              },
            ],
          },
          {
            code: 'A2',
            name: 'ACADEMIC COUNCIL',
            members: [
              {
                role: 'Dean (Academic)',
                name: 'Dr. Munish Thakur (Convenor)',
              },
              {
                role: 'Economics',
                name: 'Dr. Arpit Kumar Parija',
              },
              {
                role: 'Finance',
                name: 'Dr. Gourav Vallabh',
              },
              {
                role: 'Strategy & General Management',
                name: 'Dr. Faisal Ahsan',
              },
              {
                role: 'HRM',
                name: 'Dr. M. Srimannarayan',
              },
              {
                role: 'Marketing',
                name: 'Dr. N. Rajkumar',
              },
              {
                role: 'OB',
                name: 'Dr. Ankit',
              },
              {
                role: 'PODS',
                name: 'Dr. Sayan Mukherjee',
              },
              {
                role: 'Systems',
                name: 'Dr. Pratik Tarafdar',
              },
              {
                role: 'IEV',
                name: 'Dr. Munish Thakur',
              },
            ],
          },
          {
            code: 'A3',
            name: 'ADMINISTRATIVE COUNCIL',
            members: [
              {
                role: 'Dean (Administration & Finance)',
                name: 'Fr. Alwyn Rodrigues, SJ (Convenor)',
              },
              {
                role: 'Dean (Academics)',
                name: 'Dr. Munish Thakur',
              },
              {
                role: 'Administrator',
                name: 'Fr. J. Dayal, SJ',
              },
              {
                role: 'ADSA',
                name: 'Dr. Shubhomoy Bannerjee',
              },
              {
                role: 'Legal & HR',
                name: 'Dr. Harbhajan Singh',
              },
            ],
          },
          {
            code: 'A4',
            name: 'INVESTMENT COMMITTEE',
            members: [
              'Director (Convenor)',
              'Dean Finance',
              'Dean Administration',
              'Gourav Vallabh',
              'Investment Specialist',
              'Head Finance & Accounts',
            ],
          },
        ],
      },
      {
        code: 'B',
        title: 'COMMITTEES UNDER THE DIRECTOR',
        tabLabel: 'Under the Director',
        committees: [
          {
            code: 'B1',
            name: 'ALUMNI',
            members: [
              'Fr. Antony R Uvari, SJ (Convenor)',
              'Mr. Sugato Palit (President, XLRI Alumni Delhi Chapter)',
              'Dr. Sakhhi Chhabra',
              'Dr. Pankaj K Agarwal',
              'Mr. Harbhajan Singh',
            ],
          },
          {
            code: 'B2',
            name: 'ADMISSIONS',
            members: [
              'Dr. Pratik Tarafdar (Convenor)',
              'Dr. Soumyatanu Mukherjee',
              'Dr. Arpit Kumar Parija',
              'Dr. Sakshi Singhal',
              'Dr. Megha Bharti',
            ],
          },
          {
            code: 'B3',
            name: 'New Programs Committee',
            members: [
              'Dr. Sayan Mukherjee (Convenor)',
              'Dr. M. Srimannarayan',
              'Dr. Santosh Sangam',
              'Dr. N. Rajkumar',
              'Dr. Indrajit Mukherjee',
            ],
          },
          {
            code: 'B4',
            name: 'CENTRES',
            members: [
              'CGEIL: XLRI Centre for Gender Equality and Inclusive Leadership: Ms. Pritha Dutt (Convenor), Dr. Ankit, Dr. Smriti Das and Dr. Shubhomoy Bannerjee',
              'XADM (XLRI Centre for Automobile Design and Management)-Mr. Avik Chattopadhyay (Convenor), Dr. Faisal Ahsan, Mr. Harbhajan Singh',
              'CHM: XLRI Centre for Healthcare Management: Dr. Santosh Sangem (Convenor), Dr. Arpit Parija and Dr. Shravasti Chakravarty',
              'XCEED: XLRI Council for Entrepreneurship Excellence and Development: Dr. Arpit Parija (Convenor), Ms. Rachna Tiwari',
              'XLRI Centre for Sustainability and Climate Leadership: Mr. Sanjiv Bhatia (Convenor), Dr. Tata L Raghu Ram, Dr. Kalyan Bhaskar, Dr. Smriti Das, and Dr. Sanchayan Nath',
              'XLCP: XLRI Centre for Public Policy and Public Affairs: Dr. Smriti Das (Convenor), Dr. N. Rajkumar, and Dr. Sanchayan Nath',
            ],
          },
        ],
      },
      {
        code: 'C',
        title: 'COMMITTEES UNDER ACADEMIC COUNCIL',
        tabLabel: 'Under the Academic Council',
        committees: [
          {
            code: 'C1',
            name: 'ACCREDITATION & RANKING COMMITTEE AND ASSURANCE OF LEARNING',
            members: [
              'Dr. N. Rajkumar (Convenor)',
              'Dr. Madhu Mandal',
              'Dr. Soumyatanu Mukherjee',
              'Dr. Pankaj K Agarwal',
            ],
          },
          {
            code: 'C2',
            name: 'Internal Quality Assurance: Statutory Committee',
            members: [
              'Fr. Nelson A. D’Silva, SJ (Convenor)',
              'Dr. Munish Thakur',
              'Fr. Alwyn Rodrigues, SJ',
              'Fr. J. Dayal, SJ',
              'Dr. Gourav Vallabh',
              'Dr. Santosh Sangam',
              'Ms. Pritha Dutt',
              'Mr. Avik Chattopadhyay',
              'Dr. Raj Nehru (External Invitee)',
              'Prof. Narender Bishnoi (External Invitee)',
              'Mr. Ramesh Kumar Arora (External Invitee)',
            ],
          },
          {
            code: 'C3',
            name: 'FPM & RESEARCH',
            members: [
              'Dr. Ankit (Convenor)',
              'Dr. Sakhhi Chhabra',
              'Dr. Vaibhav Lalwani',
              'Dr. Madhu Mandal',
              'Dr. Soumyatanu Mukherjee',
              'Dr. Shakshi Singhal',
            ],
          },
          {
            code: 'C4',
            name: 'CAREER SERVICES, PLACEMENT & INDUSTRY-INSTITUTE INTERACTION',
            members: [
              'Dr. Rajiv Mishra (Mentor)',
              'Dr. Faisal Ahsan (Convenor)',
              'Dr. Shravasti Chakravarty',
              'Dr. Sayan Mukherjee',
              'Dr. Sakhhi Chhabra',
              'Dr. Vaibhav Lalwani',
              'Dr. Shubhomoy Bannerjee',
              'Dr. Pankaj K Agarwal',
              'Dr. Dharmendra Pandey',
              'Dr. Souvik Roy',
            ],
          },
          {
            code: 'C5',
            name: 'Information Technology',
            members: [
              'Dr. Manas Tripathi (Convenor)',
              'Fr. Alwyn Rodrigues, SJ',
              'Dr. Malvika Chhatwani',
              'Dr. Vaibhav Lalwani',
              'Chandraparakash Yadav',
            ],
          },
          {
            code: 'C6',
            name: 'LIBRARY',
            members: [
              'Dr. Pankaj K. Agarwal (Convenor)',
              'Fr. Alwyn Rodrigues, SJ',
              'Fr. J. Dayal, SJ',
              'Dr. Sakshi Singhal',
              'Fr. Vincent Pereppadan, SJ',
              'Dr. Sanchayan Nath',
              'Assistant Librarian',
            ],
          },
          {
            code: 'C7',
            name: 'SCHOLARSHIPS AND MEDAL COMMITTEE',
            members: [
              'Dr. Vaibhav Lalwani (Convenor)',
              'Dean (Academics)',
              'Dean (Administration)',
              'Dr. Arpit Parija',
              'Dr. Smriti Das',
              'Mr. Harbhajan Singh',
              'Mr. Avik Chattopadhyay',
            ],
          },
          {
            code: 'C8',
            name: 'Corporate Programs and Executive Education',
            members: [
              'Dr. M. Srimannarayana (Convenor)',
              'Fr. Alwyn Rodrigues, SJ',
              'Dr. N. Rajkumar',
              'Dr. Pratik Tarafdar',
              'Dr. Ankit',
              'Dr. Vaibhav Lalwani',
              'Dr. Faisal Ahsan',
            ],
          },
          {
            code: 'C9',
            name: 'Media and Outreach',
            members: [
              'Dr. Madhu Mandal (Convenor)',
              'Fr. Alwyn Rodrigues, SJ',
              'Dr. Shravasti Chakravarty',
              'Dr. Faisal Ahsan',
              'Mr. Harbhajan Singh',
              'Dr. Megha Bharti',
              'Dr. Pritha Dutt.',
              'Mr. Avik Chattopadhyay',
              'Ms. Rachna Tiwari',
              'Ms. Monika Gupta',
            ],
          },
          {
            code: 'C10',
            name: 'Know Your Student Committee',
            members: ['Dr. Sakhhi Chhabra (Convenor)', 'Dr. Ankit', 'Fr. Vincent Pereppadan, SJ'],
          },
          {
            code: 'C11',
            name: 'AI Committee',
            members: [
              'Dr. Soumyatanu Mukheerjee (Convenor)',
              'Dr. Pratik Tarafdar',
              'Dr. Manas Tripathi',
            ],
          },
          {
            code: 'C12',
            name: 'IEV Committee',
            members: [
              'Dr. Munish Thakur (Convenor)',
              'Dr. N Rajkumar',
              'Ms. Rachna Tiwari',
              'Mr. Sanjiv Bhatia',
              'Dr. Krish Shankar',
            ],
          },
          {
            code: 'C13',
            name: 'Village Immersion Program Committee',
            members: [
              'Dr. Sanchayan Nath (Convenor)',
              'Dr. Smriti Das',
              'Mr. Harbhajan Singh',
              'Ms. Anu George',
            ],
          },
        ],
      },
      {
        code: 'D',
        title: 'REGULATORY COMMITTEES',
        tabLabel: 'Regulatory',
        committees: [
          {
            code: 'D1',
            name: 'INTERNAL COMPLAINT COMMITTEE-ICC or CASH AT THE WORKPLACE -Statutory Committee',
            members: [
              'Dr. Smriti Das (Convenor)',
              'Dr. N. Rajkumar',
              'Dr. Sakhhi Chhabra',
              'Mr. Harbhajan Singh',
              'Ms. Rachna Tiwari',
              'Ms. Ambika Moonka',
              'Ms. Saloni Nazare-BM(F)',
              'Mr. Yovel P Mathews-BM(M)',
              'Ms. Anushka Aggarwal-IEV(F)',
              'Sr. Asha Paul, Advocate',
              'Sr. Thressiamma KP, NGO Representative',
            ],
          },
          {
            code: 'D2',
            name: 'ANTI-RAGGING COMMITTEE - Statutory Committee',
            members: [
              'Dr. Shubhomoy Bannerjee (ADSA-Convenor)',
              'Dr. Sayan Mukherjee',
              'Fr. Vincent Pereppadan, SJ',
              'Mr. Harbhajan Singh',
              'Ms. Pooja Grover Kapoor -NGO Representative',
              'Ms. Vaishnavi Singhal- SAC Member',
              'Ms. Mansi Nayak-(Student)',
              'Ms. Poorva Sharma-(Student)',
              'Mr. Sridhar Venkata Nuti- (Student Parent)',
              'Mr. Supratim Banerjee- (Media Representative)',
              'Ms. Pankhuri- (Police Representative)',
            ],
          },
          {
            code: 'D3',
            name: 'DISCIPLINARY COMMITTEE',
            members: [
              'Dr. Malvika Chhatwani (Convenor)',
              'Fr. Alwyn Rodrigues, SJ',
              'Dr. Gourav Vallabh',
              'Dr. N Rajkumar',
              'Dr. Sakshi Singhal',
              'Dr. Shubhomoy Bannerjee',
              'Dr. Soumyatanu Mukherjee',
              'Dr. Manas Tripathi',
            ],
          },
          {
            code: 'D4',
            name: 'GRIEVANCE REDRESSAL CELL - Statutory Committee',
            members: [
              'Fr. Vincent Pereppadan, SJ (Convenor)',
              'Dr. Gourav Vallabh',
              'Sr. Anu George',
              'Mr. Harbhajan Singh',
              'Ms. Aayushi',
              'Mr. Rahul',
            ],
          },
          {
            code: 'D5',
            name: 'SC/ST COMMITTEE - Statutory Committee',
            members: [
              'Dr. Gourav Vallabh (Convenor)',
              'Dr. Madhu Mandal',
              'Mr. Harbhajan Singh',
              'Sr. Jyoshna',
              'Ms. Aayushi',
              'Mr. Sagar Duggal -Office Boy',
            ],
          },
        ],
      },
      {
        code: 'E',
        title: 'COMMITTEES UNDER ADMINISTRATIVE COUNCIL',
        tabLabel: 'Under the Administrative Council',
        committees: [
          {
            code: 'E1',
            name: 'CAMPUS HOUSING',
            members: [
              'Dr. Shravasti Chakravarty (Convenor)',
              'Fr. Alwyn Rodrigues, SJ',
              'Fr. J. Dayal, SJ',
              'Fr. Vincent Pereppadan, SJ',
              'Dr. Smriti Das',
              'Sr. Jyoshna',
              'Mr. Ashwini Kumar',
              'Mr. Sandeep Tanwar',
            ],
          },
          {
            code: 'E2',
            name: 'CAMPUS SUSTAINABILITY',
            members: [
              'Dr. Sakshi Singhal (Convenor)',
              'Fr. Alwyn Rodrigues, SJ',
              'Fr. J. Dayal, SJ',
              'Dr. Smriti Das',
              'Dr. Madhu Mandal',
              'Dr. Sanchayan Nath',
              'Mr. Sanjiv Bhatia',
            ],
          },
          {
            code: 'E3',
            name: 'PURCHASE COMMITTEE',
            members: [
              'Fr. Alwyn Rodrigues, SJ (Convenor)',
              'Dean Finance',
              'Fr. J. Dayal, SJ',
              'Dr. Gourav Vallabh – Faculty Member',
              'Dr. Shubhomoy Mukherjee – ADSA',
              'Mr. Harbhajan Singh',
              'Mr. Rishav Anand',
              'Mr. Ashwini',
            ],
          },
          {
            code: 'E4',
            name: 'STUDENT WELFARE COMMITTEE',
            members: [
              'Dr. Pankaj Aggarwal (Convenor)',
              'Dr. Shubhomoy Bannerjee (ADSA)',
              'Fr. Alwyn Rodrigues, SJ',
              'Fr. Vincent Pereppadan, SJ (Counsellor)',
              'Dr. Malvika Chhatwani (Convenor of Disciplinary Committee)',
              'Dr. Sayan Mukherjee',
              'Ms. Aayushi',
              'Ms. Ambika',
              'Ms. Jyoti Jain',
            ],
          },
        ],
      },
    ],
  },
};
