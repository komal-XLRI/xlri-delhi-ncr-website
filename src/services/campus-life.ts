import campusTourJson from '@/content/campus-life/campus-tour.json';
import classroomsJson from '@/content/campus-life/classrooms.json';
import labsJson from '@/content/campus-life/computer-labs.json';
import itJson from '@/content/campus-life/it-infrastructure.json';
import studioJson from '@/content/campus-life/studio.json';
import conferenceJson from '@/content/campus-life/conference-rooms.json';
import xavierJson from '@/content/campus-life/xavier-hall.json';
import xceedJson from '@/content/campus-life/xceed-facilities.json';
import hostelJson from '@/content/campus-life/students-hostel.json';
import residencesJson from '@/content/campus-life/faculty-staff-residences.json';
import guestJson from '@/content/campus-life/guest-accommodation.json';
import storeJson from '@/content/campus-life/daily-needs-store.json';
import laundryJson from '@/content/campus-life/laundry-facilities.json';
import foodJson from '@/content/campus-life/food-courts.json';
import counsellingJson from '@/content/campus-life/counselling-services.json';
import gardensJson from '@/content/campus-life/gardens-parks.json';
import committeeJson from '@/content/campus-life/internal-complaints-committee.json';
import medicalJson from '@/content/campus-life/medical-facilities.json';
import mobilityJson from '@/content/campus-life/mobility-within-campus.json';
import parkingJson from '@/content/campus-life/parking-areas.json';
import sportsJson from '@/content/campus-life/sports-recreation.json';
import eventsJson from '@/content/campus-life/student-events.json';
import societiesJson from '@/content/campus-life/student-societies.json';
import { routes } from '@/constants/routes';
import {
  parseCampusServices,
  parseCampusTour,
  parseCounselling,
  parseInternalCommittee,
  parseCampusFacility,
  parseStudentEvents,
  parseStudentSocieties,
} from '@/lib/validation/campus-life';
import { getFullTimeFaculty } from '@/services/faculty';
import type { CampusFacilityPage, CampusServicesPage } from '@/types/campus-services';
import type { CampusTourPage } from '@/types/campus-tour';
import type { CounsellingPage } from '@/types/counselling';
import type { InternalCommitteePage } from '@/types/internal-committee';
import type { StudentEventsPage } from '@/types/student-events';
import type { StudentSocietiesPage } from '@/types/student-societies';

/**
 * Campus Life repository. Content lives as JSON in `content/campus-life/`,
 * validated on load. Async so the CMS query that replaces it is not a
 * signature change.
 */
const campusTour = parseCampusTour(campusTourJson, 'content/campus-life/campus-tour.json');
const mobility = parseCampusServices(
  mobilityJson,
  'content/campus-life/mobility-within-campus.json',
);
const parking = parseCampusFacility(parkingJson, 'content/campus-life/parking-areas.json');
const sports = parseCampusServices(sportsJson, 'content/campus-life/sports-recreation.json');
const gardens = parseCampusFacility(gardensJson, 'content/campus-life/gardens-parks.json');
const medical = parseCampusFacility(medicalJson, 'content/campus-life/medical-facilities.json');
const societies = parseStudentSocieties(
  societiesJson,
  'content/campus-life/student-societies.json',
);
const committee = parseInternalCommittee(
  committeeJson,
  'content/campus-life/internal-complaints-committee.json',
);

/** The video campus tour, by area. */
export async function getCampusTour(): Promise<CampusTourPage> {
  return Promise.resolve(campusTour);
}

/** The services on campus — gym, banks, shuttle and salon. */
export async function getMobilityWithinCampus(): Promise<CampusServicesPage> {
  return Promise.resolve(mobility);
}

/** The covered, solar-roofed parking. */
export async function getParkingAreas(): Promise<CampusFacilityPage> {
  return Promise.resolve(parking);
}

/** The campus medical room and its doctor. */
export async function getMedicalFacilities(): Promise<CampusFacilityPage> {
  return Promise.resolve(medical);
}

/** The Student Affairs Council and the committees under it. */
export async function getStudentSocieties(): Promise<StudentSocietiesPage> {
  return Promise.resolve(societies);
}

/** The Internal Committee on sexual harassment: what it does, how to reach it. */
export async function getInternalCommittee(): Promise<InternalCommitteePage> {
  return Promise.resolve(committee);
}

/**
 * Student events, newest first, each organiser resolved to its committee on
 * Student Societies — an unknown id fails the build rather than a link.
 */
const events: StudentEventsPage = (() => {
  const raw = parseStudentEvents(eventsJson, 'content/campus-life/student-events.json');
  const names = new Map<string, string>([
    [societies.council.id, societies.council.name],
    ...societies.committees.map((committee): [string, string] => [committee.id, committee.name]),
  ]);
  return {
    ...raw,
    events: raw.events.map(({ organisers = [], ...event }) => ({
      ...event,
      organisers: organisers.map((id) => {
        const name = names.get(id);
        if (!name)
          throw new Error(`student-events.json: "${event.id}" names unknown committee "${id}"`);
        return { id, name };
      }),
    })),
  };
})();

export async function getStudentEvents(): Promise<StudentEventsPage> {
  return Promise.resolve(events);
}

const counselling = parseCounselling(
  counsellingJson,
  'content/campus-life/counselling-services.json',
);

/** Counselling, with the counsellor drawn from the full-time faculty directory. */
export async function getCounsellingServices(): Promise<CounsellingPage> {
  const { facultyId, role } = counselling.counsellor;
  const member = (await getFullTimeFaculty()).faculty.find((person) => person.id === facultyId);
  if (!member) {
    throw new Error(`counselling-services.json: no full-time faculty member "${facultyId}"`);
  }
  return {
    ...counselling,
    counsellor: {
      name: member.name,
      role,
      designation: member.designation,
      email: member.email,
      photo: member.photo,
      href: routes.faculty.fullTimeProfile(member.id),
    },
  };
}

/** Sports and recreation: the gaming arena, courts, gym and Xavier’s Hall. */
export async function getSportsRecreation(): Promise<CampusServicesPage> {
  return Promise.resolve(sports);
}

/** The campus lawns, avenues and walking paths. */
export async function getGardensParks(): Promise<CampusFacilityPage> {
  return Promise.resolve(gardens);
}

const hostel = parseCampusFacility(hostelJson, 'content/campus-life/students-hostel.json');

/** The student hostel. */
export async function getStudentHostel(): Promise<CampusFacilityPage> {
  return Promise.resolve(hostel);
}

const residences = parseCampusFacility(
  residencesJson,
  'content/campus-life/faculty-staff-residences.json',
);

/** Faculty and staff residences. */
export async function getFacultyStaffResidences(): Promise<CampusFacilityPage> {
  return Promise.resolve(residences);
}

const guest = parseCampusFacility(guestJson, 'content/campus-life/guest-accommodation.json');

/** Guest rooms on campus. */
export async function getGuestAccommodation(): Promise<CampusFacilityPage> {
  return Promise.resolve(guest);
}

const store = parseCampusFacility(storeJson, 'content/campus-life/daily-needs-store.json');

/** The daily needs store. */
export async function getDailyNeedsStore(): Promise<CampusFacilityPage> {
  return Promise.resolve(store);
}

const laundry = parseCampusFacility(laundryJson, 'content/campus-life/laundry-facilities.json');

/** Laundry services. */
export async function getLaundryFacilities(): Promise<CampusFacilityPage> {
  return Promise.resolve(laundry);
}

const food = parseCampusServices(foodJson, 'content/campus-life/food-courts.json');

/** The cafeteria, The Daily Spot, the mess and NESCAFE Break Zone. */
export async function getFoodCourts(): Promise<CampusServicesPage> {
  return Promise.resolve(food);
}

const classroomsPage = parseCampusFacility(classroomsJson, 'content/campus-life/classrooms.json');

/** Classrooms. */
export async function getClassrooms(): Promise<CampusFacilityPage> {
  return Promise.resolve(classroomsPage);
}

const labsPage = parseCampusFacility(labsJson, 'content/campus-life/computer-labs.json');

/** Computer Labs. */
export async function getComputerLabs(): Promise<CampusFacilityPage> {
  return Promise.resolve(labsPage);
}

const itPage = parseCampusFacility(itJson, 'content/campus-life/it-infrastructure.json');

/** IT Infrastructure. */
export async function getItInfrastructure(): Promise<CampusFacilityPage> {
  return Promise.resolve(itPage);
}

const studioPage = parseCampusFacility(studioJson, 'content/campus-life/studio.json');

/** Studio. */
export async function getStudio(): Promise<CampusFacilityPage> {
  return Promise.resolve(studioPage);
}

const conferencePage = parseCampusFacility(
  conferenceJson,
  'content/campus-life/conference-rooms.json',
);

/** Conference Rooms. */
export async function getConferenceRooms(): Promise<CampusFacilityPage> {
  return Promise.resolve(conferencePage);
}

const xavierPage = parseCampusFacility(xavierJson, 'content/campus-life/xavier-hall.json');

/** Xavier Hall. */
export async function getXavierHall(): Promise<CampusFacilityPage> {
  return Promise.resolve(xavierPage);
}

const xceedPage = parseCampusFacility(xceedJson, 'content/campus-life/xceed-facilities.json');

/** XCEED Facilities. */
export async function getXceedFacilities(): Promise<CampusFacilityPage> {
  return Promise.resolve(xceedPage);
}
