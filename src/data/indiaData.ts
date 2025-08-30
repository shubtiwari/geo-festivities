export const indiaStates = [
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
];

export const citiesByState: { [key: string]: string[] } = {
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
  ],
  'west-bengal': [
    'Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Malda', 'Bardhaman', 'Kharagpur', 'Haldia', 'Raiganj', 'Krishnanagar', 'Nabadwip'
  ],
  'gujarat': [
    'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Gandhinagar', 'Junagadh', 'Anand', 'Navsari', 'Morbi', 'Bharuch'
  ],
  'rajasthan': [
    'Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner', 'Ajmer', 'Bhilwara', 'Alwar', 'Bharatpur', 'Pali', 'Sikar', 'Tonk'
  ],
  'uttar-pradesh': [
    'Lucknow', 'Kanpur', 'Ghaziabad', 'Agra', 'Varanasi', 'Meerut', 'Allahabad', 'Bareilly', 'Aligarh', 'Moradabad', 'Saharanpur', 'Gorakhpur'
  ],
  'haryana': [
    'Faridabad', 'Gurgaon', 'Panipat', 'Ambala', 'Yamunanagar', 'Rohtak', 'Hisar', 'Karnal', 'Sonipat', 'Panchkula', 'Bhiwani', 'Sirsa'
  ],
  'punjab': [
    'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali', 'Firozpur', 'Batala', 'Pathankot', 'Moga', 'Abohar', 'Malerkotla'
  ],
  'madhya-pradesh': [
    'Indore', 'Bhopal', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Dewas', 'Satna', 'Ratlam', 'Rewa', 'Murwara', 'Singrauli'
  ],
  'telangana': [
    'Hyderabad', 'Warangal', 'Nizamabad', 'Khammam', 'Karimnagar', 'Ramagundam', 'Mahbubnagar', 'Nalgonda', 'Adilabad', 'Suryapet', 'Miryalaguda', 'Jagtial'
  ],
  'andhra-pradesh': [
    'Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Rajahmundry', 'Kadapa', 'Kakinada', 'Tirupati', 'Anantapur', 'Vizianagaram', 'Eluru'
  ],
  'kerala': [
    'Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Kollam', 'Thrissur', 'Alappuzha', 'Palakkad', 'Malappuram', 'Kannur', 'Kasaragod', 'Kottayam', 'Pathanamthitta'
  ],
  'odisha': [
    'Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur', 'Puri', 'Balasore', 'Bhadrak', 'Baripada', 'Jharsuguda', 'Jeypore', 'Barbil'
  ],
  'bihar': [
    'Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia', 'Darbhanga', 'Bihar Sharif', 'Arrah', 'Begusarai', 'Katihar', 'Munger', 'Chhapra'
  ],
  'assam': [
    'Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Nagaon', 'Tinsukia', 'Tezpur', 'Bongaigaon', 'Karimganj', 'Dhubri', 'North Lakhimpur', 'Goalpara'
  ],
  'jharkhand': [
    'Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar', 'Phusro', 'Hazaribagh', 'Giridih', 'Ramgarh', 'Medininagar', 'Chirkunda', 'Pakaur'
  ],
  'himachal-pradesh': [
    'Shimla', 'Solan', 'Dharamshala', 'Mandi', 'Palampur', 'Baddi', 'Nahan', 'Paonta Sahib', 'Sundarnagar', 'Chamba', 'Una', 'Kullu'
  ],
  'uttarakhand': [
    'Dehradun', 'Haridwar', 'Roorkee', 'Haldwani-cum-Kathgodam', 'Rudrapur', 'Kashipur', 'Rishikesh', 'Pithoragarh', 'Ramnagar', 'Manglaur', 'Nainital', 'Mussoorie'
  ],
  'chhattisgarh': [
    'Raipur', 'Bhilai', 'Korba', 'Bilaspur', 'Durg', 'Rajnandgaon', 'Jagdalpur', 'Raigarh', 'Ambikapur', 'Mahasamund', 'Dhamtari', 'Chirmiri'
  ],
  'goa': [
    'Panaji', 'Vasco da Gama', 'Margao', 'Mapusa', 'Ponda', 'Bicholim', 'Curchorem', 'Sanquelim', 'Cuncolim', 'Quepem', 'Canacona', 'Sanguem'
  ]
};