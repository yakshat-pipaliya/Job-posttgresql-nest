export const messages = {
  userCreated: 'User created successfully.',
  userUpdated: 'User updated successfully.',
  userDeleted: 'User deleted successfully.',
  userNotFound: 'User not found.',
  invalidCredentials: 'Invalid email or password.',
  unauthorized: 'Unauthorized access.',
  forbidden: 'Forbidden request.',
  badRequest: 'Bad request.',
  internalServerError: 'Internal server error.',
  emailAlreadyExists: 'Email already exists.',
  phoneAlreadyExists: 'Phone number already exists.',
  missingFields: 'Required fields are missing.',
  invalidEmail: 'Invalid email address.',
  invalidPhone: 'Invalid phone number.',
  passwordTooWeak: 'Password is too weak.',
  nameRequired: 'Name is required.',
  emailRequired: 'Email is required.',
  passwordRequired: 'Password is required.',
  phoneRequired: 'Phone number is required.',
  roleRequired: 'Role is required.',
  companyCreated: 'Company created successfully.',
  companyUpdated: 'Company updated successfully.',
  companyDeleted: 'Company deleted successfully.',
  companyNotFound: 'No company found with ID: {id}. Please verify the ID and try again.',
  companyNotFoundUpdate: 'Cannot update: No company found with ID: {id}.',
  companyNotFoundDelete: 'Cannot delete: No company found with ID: {id}.',
  companyDeletedWithId: 'Company with ID {id} deleted successfully.',
  companyFound: 'Company found.',
  companyListReturned: 'List of companies returned.',
  jobApplicationUserNotFound: 'User with ID {userId} not found.',
  jobApplicationJobListingNotFound: 'Job Listing with ID {jobListingId} not found.',
  jobApplicationCreated: 'Job application created successfully.',
  jobApplicationCreateFailed: 'Failed to create job application.',
  jobApplicationsFetched: 'Job applications fetched successfully.',
  jobApplicationNotFoundWithId: 'Job Application with ID {id} not found.',
  jobApplicationFound: 'Job application found.',
  jobApplicationUpdated: 'Job application updated successfully.',
  jobApplicationUpdateFailed: 'Failed to update job application.',
  jobApplicationDeleted: 'Job application deleted successfully.',
  jobApplicationDeleteFailed: 'Failed to delete job application.',
  jobApplicationNotFoundError: 'NotFound',
  jobApplicationUserNotFoundError: 'UserNotFound',
  jobApplicationJobListingNotFoundError: 'JobListingNotFound',
  onlyImageFilesAllowed: 'Only image files are allowed!',
  jobListingCreated: 'Job listing created successfully.',
  jobListingUpdated: 'Job listing updated successfully.',
  jobListingDeleted: 'Job listing deleted successfully.',
  jobListingNotFound: 'Job listing not found.',
  jobListingNotFoundWithId: 'JobListing with id {id} not found.',
  jobListingDeletedWithId: 'Job listing with id {id} deleted successfully.',
  jobListingFound: 'Job listing found.',
  jobListingListReturned: 'List of job listings returned.',
};

export const userDtoExamples = {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'strongPassword123',
  phoneNo: '+9876543210',
  role: 'user',
};

export const userDtoDescriptions = {
  name: 'Full name of the user',
  email: 'Email address of the user',
  password: 'User password',
  phoneNo: 'User phone number',
  role: 'Role of the user',
};

export const updateUserDtoExamples = {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'strongPassword123',
  phoneNo: '+9876543210',
  role: 'user',
};

export const updateUserDtoDescriptions = {
  name: 'Full name of the user',
  email: 'Email address of the user',
  password: 'User password',
  phoneNo: 'User phone number',
  role: 'Role of the user',
};

export const loginDtoExamples = {
  email: 'john@example.com',
  password: 'strongPassword123',
};

export const loginDtoDescriptions = {
  email: 'Email address of the user',
  password: 'User password',
};

export const createCompanyDtoExamples = {
  CompanyName: 'Acme Corp',
  Email: 'contact@acme.com',
  ContactNo: '+1234567890',
  Location: 'New York',
};

export const createCompanyDtoDescriptions = {
  CompanyName: 'Name of the company',
  Email: 'Contact email of the company',
  ContactNo: 'Contact phone number',
  Location: 'Location of the company',
};

export const createJobApplicationDtoExamples = {
  userId: 1,
  jobListingId: 2,
  resume: 'resume-123456789.pdf',
};

export const createJobApplicationDtoDescriptions = {
  userId: 'ID of the user applying for the job',
  jobListingId: 'ID of the job listing',
  resume: 'Uploaded resume file name',
};

export const createJobListingDtoExamples = {
  companyId: 1,
  title: 'Software Engineer',
  description: 'Develop and maintain software...',
  requirements: '3+ years experience in Node.js',
  salaryRange: '₹8,00,000 - ₹12,00,000',
  jobType: 'FullTime',
};

export const createJobListingDtoDescriptions = {
  companyId: 'ID of the company posting the job',
  title: 'Title of the job',
  description: 'Job description',
  requirements: 'Job requirements',
  salaryRange: 'Salary range for the job',
  jobType: 'Type of job (e.g., FullTime, PartTime, Contract)',
};

export const jobTypeEnumMessage = `jobType must be one of the following values: FullTime, PartTime, Contract`;

export const jobApplicationMessages = {
  resumeRequired: 'Resume file is required.',
  resumeMissingError: 'ResumeMissing',
  created: 'Job application created successfully.',
  updated: 'Job application updated successfully.',
  deleted: 'Job application deleted successfully.',
  notFound: 'Job application not found.',
  found: 'Job application found.',
  listReturned: 'List of job applications returned.',
};

export const jobApplicationSummaries = {
  create: 'Create a job application with resume upload',
  getAll: 'Get all job applications',
  getOne: 'Get a job application by ID',
  update: 'Update a job application by ID with optional resume upload',
  delete: 'Delete a job application by ID',
};

export const jobApplicationDescriptions = {
  list: 'List of job applications',
  found: 'Job application found',
  notFound: 'Job application not found',
  deleted: 'Job application deleted',
};

export const statusCodes = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
} as const;

export enum JobStatus {
  Interviewing = 'interviewing',
  Rejected = 'rejected',
  Pending = 'pending',
}

export const jobApplicationStatusExamples = {
  JobApplicationId: 1,
  Status: JobStatus.Pending,
};

export const jobApplicationStatusMessages = {
  statusRequired: 'Status is required.',
  invalidStatus: `JobStatus must be one of the following values: interviewing, rejected, pending`,
  created: 'Job application Status created successfully.',
  updated: 'Job application Status updated successfully.',
  deleted: 'Job application Status deleted successfully.',
  notFound: 'Job application Status not found.',
  found: 'Job application Status found.',
  listReturned: 'List of job applications Status returned.',
};

export const jobApplicationStatusDescriptions = {
  JobApplicationId: 'Id of the JobApplication',
  Status: 'Type of Status (e.g., interviewing, rejected, pending)',
};

export const jobApplicationStatusLogMessages = {
  creating: 'Error creating JobApplicationStatus',
  updating: 'Error updating JobApplicationStatus',
  removing: 'Removing JobApplicationStatus with id',

};

export enum JobType {
  FullTime = 'FullTime',
  PartTime = 'PartTime',
  Contract = 'Contract',
}

export enum UserRole {
  User = 'user',
  Admin = 'admin',
}