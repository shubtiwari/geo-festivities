export const countries = [
  { id: 'india', name: 'India' },
  { id: 'usa', name: 'United States' },
  { id: 'canada', name: 'Canada' },
  { id: 'uk', name: 'United Kingdom' },
  { id: 'australia', name: 'Australia' }
];

export const statesByCountry: { [key: string]: { id: string, name: string }[] } = {
  'india': [
    { id: 'andhra-pradesh', name: 'Andhra Pradesh' },
    { id: 'arunachal-pradesh', name: 'Arunachal Pradesh' },
    { id: 'assam', name: 'Assam' },
    { id: 'bihar', name: 'Bihar' },
    { id: 'chhattisgarh', name: 'Chhattisgarh' },
    { id: 'goa', name: 'Goa' },
    { id: 'gujarat', name: 'Gujarat' },
    { id: 'haryana', name: 'Haryana' },
    { id: 'himachal-pradesh', name: 'Himachal Pradesh' },
    { id: 'jharkhand', name: 'Jharkhand' },
    { id: 'karnataka', name: 'Karnataka' },
    { id: 'kerala', name: 'Kerala' },
    { id: 'madhya-pradesh', name: 'Madhya Pradesh' },
    { id: 'maharashtra', name: 'Maharashtra' },
    { id: 'manipur', name: 'Manipur' },
    { id: 'meghalaya', name: 'Meghalaya' },
    { id: 'mizoram', name: 'Mizoram' },
    { id: 'nagaland', name: 'Nagaland' },
    { id: 'odisha', name: 'Odisha' },
    { id: 'punjab', name: 'Punjab' },
    { id: 'rajasthan', name: 'Rajasthan' },
    { id: 'sikkim', name: 'Sikkim' },
    { id: 'tamil-nadu', name: 'Tamil Nadu' },
    { id: 'telangana', name: 'Telangana' },
    { id: 'tripura', name: 'Tripura' },
    { id: 'uttar-pradesh', name: 'Uttar Pradesh' },
    { id: 'uttarakhand', name: 'Uttarakhand' },
    { id: 'west-bengal', name: 'West Bengal' },
    { id: 'delhi', name: 'Delhi' },
    { id: 'jammu-kashmir', name: 'Jammu & Kashmir' },
    { id: 'ladakh', name: 'Ladakh' }
  ],
  'usa': [
    { id: 'california', name: 'California' },
    { id: 'texas', name: 'Texas' },
    { id: 'florida', name: 'Florida' },
    { id: 'new-york', name: 'New York' },
    { id: 'illinois', name: 'Illinois' }
  ],
  'canada': [
    { id: 'ontario', name: 'Ontario' },
    { id: 'quebec', name: 'Quebec' },
    { id: 'british-columbia', name: 'British Columbia' },
    { id: 'alberta', name: 'Alberta' }
  ]
};

export const citiesByCountryState: { [key: string]: { [key: string]: string[] } } = {
  'india': {
    'maharashtra': [
      'Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad', 'Solapur', 'Kolhapur', 'Sangli', 'Satara', 'Ahmednagar', 'Akola'
    ],
    'delhi': [
      'New Delhi', 'Central Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi', 'North West Delhi', 'North East Delhi', 'South West Delhi', 'South East Delhi'
    ],
    'karnataka': [
      'Bangalore', 'Mysore', 'Hubli-Dharwad', 'Mangalore', 'Belgaum', 'Gulbarga', 'Davanagere', 'Bellary', 'Bijapur', 'Shimoga', 'Tumkur', 'Raichur'
    ],
    'tamil-nadu': [
      'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Tiruppur', 'Erode', 'Vellore', 'Thoothukudi', 'Dindigul', 'Thanjavur'
    ]
  },
  'usa': {
    'california': [
      'Los Angeles', 'San Francisco', 'San Diego', 'Sacramento', 'San Jose', 'Oakland', 'Fresno', 'Long Beach'
    ],
    'texas': [
      'Houston', 'Dallas', 'Austin', 'San Antonio', 'Fort Worth', 'El Paso', 'Arlington', 'Corpus Christi'
    ],
    'new-york': [
      'New York City', 'Buffalo', 'Rochester', 'Syracuse', 'Albany', 'Yonkers', 'New Rochelle'
    ]
  }
};

// Mock pincode data for India
export const pincodeData: { [key: string]: { city: string, state: string, country: string } } = {
  '400001': { city: 'Mumbai', state: 'Maharashtra', country: 'India' },
  '400002': { city: 'Mumbai', state: 'Maharashtra', country: 'India' },
  '110001': { city: 'New Delhi', state: 'Delhi', country: 'India' },
  '560001': { city: 'Bangalore', state: 'Karnataka', country: 'India' },
  '600001': { city: 'Chennai', state: 'Tamil Nadu', country: 'India' },
  '700001': { city: 'Kolkata', state: 'West Bengal', country: 'India' },
  '411001': { city: 'Pune', state: 'Maharashtra', country: 'India' },
  '500001': { city: 'Hyderabad', state: 'Telangana', country: 'India' },
  '302001': { city: 'Jaipur', state: 'Rajasthan', country: 'India' },
  '380001': { city: 'Ahmedabad', state: 'Gujarat', country: 'India' }
};