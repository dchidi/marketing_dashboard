import type { ColumnDef } from "@tanstack/react-table";
export interface ActiveUserProps {
  id: number;
  country: string;
  brand: string;
  quote_number: string;
  quote_status: string;
  quote_start_date: string;
  quote_end_date: string;
  client_name: string;
  email: string;
  phone_number: string;
  pet_name: string;
  pet_type: string;
  pet_breed: string;
  pet_dob: number;
}
export const useExpiredPolicy = () => {
  // Fetch data from endpoint
  const quoteData: ActiveUserProps[] = [
    {
      id: 1,
      country: "Australia",
      brand: "Petcover",
      quote_number: "PAW-2023-1001",
      quote_status: "Live",
      quote_start_date: "2023-01-15",
      quote_end_date: "2023-12-15",
      client_name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone_number: "+1 555-123-4567",
      pet_name: "Max",
      pet_type: "Dog",
      pet_breed: "Golden Retriever",
      pet_dob: 2018,
    },
    {
      id: 2,
      country: "Australia",
      brand: "Petcover",
      quote_number: "PET-2023-2042",
      quote_status: "Live",
      quote_start_date: "2023-02-20",
      quote_end_date: "2023-11-20",
      client_name: "Michael Chen",
      email: "michael.c@example.com",
      phone_number: "+1 416-555-7890",
      pet_name: "Luna",
      pet_type: "Cat",
      pet_breed: "Siamese",
      pet_dob: 2020,
    },
    {
      id: 3,
      country: "Australia",
      brand: "Petcover",
      quote_number: "AG-2023-3056",
      quote_status: "Lapsed",
      quote_start_date: "2022-11-10",
      quote_end_date: "2023-11-10",
      client_name: "Emma Wilson",
      email: "emma.w@example.com",
      phone_number: "+44 20 7946 0958",
      pet_name: "Charlie",
      pet_type: "Dog",
      pet_breed: "Labrador",
      pet_dob: 2019,
    },
    {
      id: 4,
      country: "Australia",
      brand: "Petcover",
      quote_number: "KLP-2023-4089",
      quote_status: "Live",
      quote_start_date: "2023-03-05",
      quote_end_date: "2024-03-05",
      client_name: "James Brown",
      email: "james.b@example.com",
      phone_number: "+61 2 5555 6789",
      pet_name: "Bella",
      pet_type: "Cat",
      pet_breed: "Persian",
      pet_dob: 2021,
    },
    {
      id: 5,
      country: "Australia",
      brand: "Petcover",
      quote_number: "TS-2023-5123",
      quote_status: "Lapsed",
      quote_start_date: "2023-01-30",
      quote_end_date: "2023-07-30",
      client_name: "Hans Müller",
      email: "hans.m@example.com",
      phone_number: "+49 30 5555 1234",
      pet_name: "Rocky",
      pet_type: "Dog",
      pet_breed: "German Shepherd",
      pet_dob: 2017,
    },
    {
      id: 6,
      country: "Australia",
      brand: "Petcover",
      quote_number: "AP-2023-6157",
      quote_status: "Lapsed",
      quote_start_date: "2023-04-18",
      quote_end_date: "2024-04-18",
      client_name: "Sophie Martin",
      email: "sophie.m@example.com",
      phone_number: "+33 1 5555 9876",
      pet_name: "Milo",
      pet_type: "Exotic",
      pet_breed: "Holland Lop",
      pet_dob: 2022,
    },
    {
      id: 7,
      country: "Australia",
      brand: "Petcover",
      quote_number: "NC-2023-7192",
      quote_status: "Live",
      quote_start_date: "2023-05-22",
      quote_end_date: "2023-11-22",
      client_name: "Yuki Tanaka",
      email: "yuki.t@example.com",
      phone_number: "+81 3-5555-4567",
      pet_name: "Hana",
      pet_type: "Cat",
      pet_breed: "Scottish Fold",
      pet_dob: 2020,
    },
    {
      id: 8,
      country: "Australia",
      brand: "Petcover",
      quote_number: "PB-2023-8226",
      quote_status: "Live",
      quote_start_date: "2023-06-10",
      quote_end_date: "2024-06-10",
      client_name: "Carlos Silva",
      email: "carlos.s@example.com",
      phone_number: "+55 11 95555-1234",
      pet_name: "Thor",
      pet_type: "Dog",
      pet_breed: "Rottweiler",
      pet_dob: 2019,
    },
    {
      id: 9,
      country: "Australia",
      brand: "Petcover",
      quote_number: "SP-2023-9250",
      quote_status: "Lapsed",
      quote_start_date: "2022-12-01",
      quote_end_date: "2023-06-01",
      client_name: "Nomvula Mbatha",
      email: "nomvula.m@example.com",
      phone_number: "+27 11 555 5678",
      pet_name: "Simba",
      pet_type: "Cat",
      pet_breed: "Bengal",
      pet_dob: 2021,
    },
    {
      id: 10,
      country: "Australia",
      brand: "Petcover",
      quote_number: "PI-2023-1034",
      quote_status: "Live",
      quote_start_date: "2023-07-15",
      quote_end_date: "2024-07-15",
      client_name: "Priya Patel",
      email: "priya.p@example.com",
      phone_number: "+91 80 5555 4321",
      pet_name: "Daisy",
      pet_type: "Dog",
      pet_breed: "Pomeranian",
      pet_dob: 2022,
    },
  ];

  // Define columns
  const columns: ColumnDef<ActiveUserProps>[] = [
    {
      accessorKey: "country",
      header: "Country",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "brand",
      header: "Brand",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "quote_number",
      header: "Quote No.",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "quote_status",
      header: "Status",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "quote_start_date",
      header: "Start Date",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "quote_end_date",
      header: "End Date",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "client_name",
      header: "Client Name",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "phone_number",
      header: "Phone",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "pet_name",
      header: "Pet Name",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "pet_type",
      header: "Pet Type",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "pet_breed",
      header: "Pet Breed",
      cell: (info) => info.getValue(),
    },

    {
      accessorKey: "pet_dob",
      header: "Pet DOB",
      cell: (info) => info.getValue(),
    },
    // If date sorting is wrong then use the below implementation
    // {
    //   accessorKey: "hireDate",
    //   header: "Hire Date",
    //   cell: (info) => info.getValue<string>(),
    //   sortingFn: (rowA, rowB, columnId) => {
    //     const dateA = new Date(rowA.getValue(columnId));
    //     const dateB = new Date(rowB.getValue(columnId));
    //     return dateA.getTime() - dateB.getTime();
    //   },
    // },
    // {
    //   accessorKey: "salary" as const,
    //   header: "Salary",
    //   cell: (info) => `$${info.getValue<number>().toLocaleString()}`,
    // },
    // {
    //   accessorKey: "isActive",
    //   header: "Status",
    //   cell: (info) => (info.getValue() ? "Active" : "Inactive"),
    // },
  ];

  return { quoteData, columns };
};
