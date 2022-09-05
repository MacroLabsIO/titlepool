import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Col, Button } from "react-bootstrap";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import firebase from "../../context/firebase"
import './styles.scss';
import CustomDatePicker from "../../components/CustomDatePicker";

const SignUp = React.memo(() => {

    const navigate = useNavigate();
    const [error, setError] = useState('');

    const rolesList = [
        "Filmmaker", "Sales Agent", "Distributor", "Exhibitor", "Investor", "Studio"
    ]

    const countryList = [
        { "text": "Afghanistan", "value": "AF" },
        { "text": "Åland Islands", "value": "AX" },
        { "text": "Albania", "value": "AL" },
        { "text": "Algeria", "value": "DZ" },
        { "text": "American Samoa", "value": "AS" },
        { "text": "Andorra", "value": "AD" },
        { "text": "Angola", "value": "AO" },
        { "text": "Anguilla", "value": "AI" },
        { "text": "Antarctica", "value": "AQ" },
        { "text": "Antigua and Barbuda", "value": "AG" },
        { "text": "Argentina", "value": "AR" },
        { "text": "Armenia", "value": "AM" },
        { "text": "Aruba", "value": "AW" },
        { "text": "Australia", "value": "AU" },
        { "text": "Austria", "value": "AT" },
        { "text": "Azerbaijan", "value": "AZ" },
        { "text": "Bahamas", "value": "BS" },
        { "text": "Bahrain", "value": "BH" },
        { "text": "Bangladesh", "value": "BD" },
        { "text": "Barbados", "value": "BB" },
        { "text": "Belarus", "value": "BY" },
        { "text": "Belgium", "value": "BE" },
        { "text": "Belize", "value": "BZ" },
        { "text": "Benin", "value": "BJ" },
        { "text": "Bermuda", "value": "BM" },
        { "text": "Bhutan", "value": "BT" },
        { "text": "Bolivia", "value": "BO" },
        { "text": "Bosnia and Herzegovina", "value": "BA" },
        { "text": "Botswana", "value": "BW" },
        { "text": "Bouvet Island", "value": "BV" },
        { "text": "Brazil", "value": "BR" },
        { "text": "British Indian Ocean Territory", "value": "IO" },
        { "text": "Brunei Darussalam", "value": "BN" },
        { "text": "Bulgaria", "value": "BG" },
        { "text": "Burkina Faso", "value": "BF" },
        { "text": "Burundi", "value": "BI" },
        { "text": "Cambodia", "value": "KH" },
        { "text": "Cameroon", "value": "CM" },
        { "text": "Canada", "value": "CA" },
        { "text": "Cape Verde", "value": "CV" },
        { "text": "Cayman Islands", "value": "KY" },
        { "text": "Central African Republic", "value": "CF" },
        { "text": "Chad", "value": "TD" },
        { "text": "Chile", "value": "CL" },
        { "text": "China", "value": "CN" },
        { "text": "Christmas Island", "value": "CX" },
        { "text": "Cocos (Keeling) Islands", "value": "CC" },
        { "text": "Colombia", "value": "CO" },
        { "text": "Comoros", "value": "KM" },
        { "text": "Congo", "value": "CG" },
        { "text": "Congo, The Democratic Republic of the", "value": "CD" },
        { "text": "Cook Islands", "value": "CK" },
        { "text": "Costa Rica", "value": "CR" },
        { "text": "Cote D'Ivoire", "value": "CI" },
        { "text": "Croatia", "value": "HR" },
        { "text": "Cuba", "value": "CU" },
        { "text": "Cyprus", "value": "CY" },
        { "text": "Czech Republic", "value": "CZ" },
        { "text": "Denmark", "value": "DK" },
        { "text": "Djibouti", "value": "DJ" },
        { "text": "Dominica", "value": "DM" },
        { "text": "Dominican Republic", "value": "DO" },
        { "text": "Ecuador", "value": "EC" },
        { "text": "Egypt", "value": "EG" },
        { "text": "El Salvador", "value": "SV" },
        { "text": "Equatorial Guinea", "value": "GQ" },
        { "text": "Eritrea", "value": "ER" },
        { "text": "Estonia", "value": "EE" },
        { "text": "Ethiopia", "value": "ET" },
        { "text": "Falkland Islands (Malvinas)", "value": "FK" },
        { "text": "Faroe Islands", "value": "FO" },
        { "text": "Fiji", "value": "FJ" },
        { "text": "Finland", "value": "FI" },
        { "text": "France", "value": "FR" },
        { "text": "French Guiana", "value": "GF" },
        { "text": "French Polynesia", "value": "PF" },
        { "text": "French Southern Territories", "value": "TF" },
        { "text": "Gabon", "value": "GA" },
        { "text": "Gambia", "value": "GM" },
        { "text": "Georgia", "value": "GE" },
        { "text": "Germany", "value": "DE" },
        { "text": "Ghana", "value": "GH" },
        { "text": "Gibraltar", "value": "GI" },
        { "text": "Greece", "value": "GR" },
        { "text": "Greenland", "value": "GL" },
        { "text": "Grenada", "value": "GD" },
        { "text": "Guadeloupe", "value": "GP" },
        { "text": "Guam", "value": "GU" },
        { "text": "Guatemala", "value": "GT" },
        { "text": "Guernsey", "value": "GG" },
        { "text": "Guinea", "value": "GN" },
        { "text": "Guinea-Bissau", "value": "GW" },
        { "text": "Guyana", "value": "GY" },
        { "text": "Haiti", "value": "HT" },
        { "text": "Heard Island and Mcdonald Islands", "value": "HM" },
        { "text": "Holy See (Vatican City State)", "value": "VA" },
        { "text": "Honduras", "value": "HN" },
        { "text": "Hong Kong", "value": "HK" },
        { "text": "Hungary", "value": "HU" },
        { "text": "Iceland", "value": "IS" },
        { "text": "India", "value": "IN" },
        { "text": "Indonesia", "value": "ID" },
        { "text": "Iran, Islamic Republic Of", "value": "IR" },
        { "text": "Iraq", "value": "IQ" },
        { "text": "Ireland", "value": "IE" },
        { "text": "Isle of Man", "value": "IM" },
        { "text": "Israel", "value": "IL" },
        { "text": "Italy", "value": "IT" },
        { "text": "Jamaica", "value": "JM" },
        { "text": "Japan", "value": "JP" },
        { "text": "Jersey", "value": "JE" },
        { "text": "Jordan", "value": "JO" },
        { "text": "Kazakhstan", "value": "KZ" },
        { "text": "Kenya", "value": "KE" },
        { "text": "Kiribati", "value": "KI" },
        { "text": "Korea, Democratic People'S Republic of", "value": "KP" },
        { "text": "Korea, Republic of", "value": "KR" },
        { "text": "Kuwait", "value": "KW" },
        { "text": "Kyrgyzstan", "value": "KG" },
        { "text": "Lao People'S Democratic Republic", "value": "LA" },
        { "text": "Latvia", "value": "LV" },
        { "text": "Lebanon", "value": "LB" },
        { "text": "Lesotho", "value": "LS" },
        { "text": "Liberia", "value": "LR" },
        { "text": "Libyan Arab Jamahiriya", "value": "LY" },
        { "text": "Liechtenstein", "value": "LI" },
        { "text": "Lithuania", "value": "LT" },
        { "text": "Luxembourg", "value": "LU" },
        { "text": "Macao", "value": "MO" },
        { "text": "Macedonia, The Former Yugoslav Republic of", "value": "MK" },
        { "text": "Madagascar", "value": "MG" },
        { "text": "Malawi", "value": "MW" },
        { "text": "Malaysia", "value": "MY" },
        { "text": "Maldives", "value": "MV" },
        { "text": "Mali", "value": "ML" },
        { "text": "Malta", "value": "MT" },
        { "text": "Marshall Islands", "value": "MH" },
        { "text": "Martinique", "value": "MQ" },
        { "text": "Mauritania", "value": "MR" },
        { "text": "Mauritius", "value": "MU" },
        { "text": "Mayotte", "value": "YT" },
        { "text": "Mexico", "value": "MX" },
        { "text": "Micronesia, Federated States of", "value": "FM" },
        { "text": "Moldova, Republic of", "value": "MD" },
        { "text": "Monaco", "value": "MC" },
        { "text": "Mongolia", "value": "MN" },
        { "text": "Montserrat", "value": "MS" },
        { "text": "Morocco", "value": "MA" },
        { "text": "Mozambique", "value": "MZ" },
        { "text": "Myanmar", "value": "MM" },
        { "text": "Namibia", "value": "NA" },
        { "text": "Nauru", "value": "NR" },
        { "text": "Nepal", "value": "NP" },
        { "text": "Netherlands", "value": "NL" },
        { "text": "Netherlands Antilles", "value": "AN" },
        { "text": "New Caledonia", "value": "NC" },
        { "text": "New Zealand", "value": "NZ" },
        { "text": "Nicaragua", "value": "NI" },
        { "text": "Niger", "value": "NE" },
        { "text": "Nigeria", "value": "NG" },
        { "text": "Niue", "value": "NU" },
        { "text": "Norfolk Island", "value": "NF" },
        { "text": "Northern Mariana Islands", "value": "MP" },
        { "text": "Norway", "value": "NO" },
        { "text": "Oman", "value": "OM" },
        { "text": "Pakistan", "value": "PK" },
        { "text": "Palau", "value": "PW" },
        { "text": "Palestinian Territory, Occupied", "value": "PS" },
        { "text": "Panama", "value": "PA" },
        { "text": "Papua New Guinea", "value": "PG" },
        { "text": "Paraguay", "value": "PY" },
        { "text": "Peru", "value": "PE" },
        { "text": "Philippines", "value": "PH" },
        { "text": "Pitcairn", "value": "PN" },
        { "text": "Poland", "value": "PL" },
        { "text": "Portugal", "value": "PT" },
        { "text": "Puerto Rico", "value": "PR" },
        { "text": "Qatar", "value": "QA" },
        { "text": "Reunion", "value": "RE" },
        { "text": "Romania", "value": "RO" },
        { "text": "Russian Federation", "value": "RU" },
        { "text": "RWANDA", "value": "RW" },
        { "text": "Saint Helena", "value": "SH" },
        { "text": "Saint Kitts and Nevis", "value": "KN" },
        { "text": "Saint Lucia", "value": "LC" },
        { "text": "Saint Pierre and Miquelon", "value": "PM" },
        { "text": "Saint Vincent and the Grenadines", "value": "VC" },
        { "text": "Samoa", "value": "WS" },
        { "text": "San Marino", "value": "SM" },
        { "text": "Sao Tome and Principe", "value": "ST" },
        { "text": "Saudi Arabia", "value": "SA" },
        { "text": "Senegal", "value": "SN" },
        { "text": "Serbia and Montenegro", "value": "CS" },
        { "text": "Seychelles", "value": "SC" },
        { "text": "Sierra Leone", "value": "SL" },
        { "text": "Singapore", "value": "SG" },
        { "text": "Slovakia", "value": "SK" },
        { "text": "Slovenia", "value": "SI" },
        { "text": "Solomon Islands", "value": "SB" },
        { "text": "Somalia", "value": "SO" },
        { "text": "South Africa", "value": "ZA" },
        { "text": "South Georgia and the South Sandwich Islands", "value": "GS" },
        { "text": "Spain", "value": "ES" },
        { "text": "Sri Lanka", "value": "LK" },
        { "text": "Sudan", "value": "SD" },
        { "text": "Suriname", "value": "SR" },
        { "text": "Svalbard and Jan Mayen", "value": "SJ" },
        { "text": "Swaziland", "value": "SZ" },
        { "text": "Sweden", "value": "SE" },
        { "text": "Switzerland", "value": "CH" },
        { "text": "Syrian Arab Republic", "value": "SY" },
        { "text": "Taiwan, Province of China", "value": "TW" },
        { "text": "Tajikistan", "value": "TJ" },
        { "text": "Tanzania, United Republic of", "value": "TZ" },
        { "text": "Thailand", "value": "TH" },
        { "text": "Timor-Leste", "value": "TL" },
        { "text": "Togo", "value": "TG" },
        { "text": "Tokelau", "value": "TK" },
        { "text": "Tonga", "value": "TO" },
        { "text": "Trinidad and Tobago", "value": "TT" },
        { "text": "Tunisia", "value": "TN" },
        { "text": "Turkey", "value": "TR" },
        { "text": "Turkmenistan", "value": "TM" },
        { "text": "Turks and Caicos Islands", "value": "TC" },
        { "text": "Tuvalu", "value": "TV" },
        { "text": "Uganda", "value": "UG" },
        { "text": "Ukraine", "value": "UA" },
        { "text": "United Arab Emirates", "value": "AE" },
        { "text": "United Kingdom", "value": "GB" },
        { "text": "United States", "value": "US" },
        { "text": "United States Minor Outlying Islands", "value": "UM" },
        { "text": "Uruguay", "value": "UY" },
        { "text": "Uzbekistan", "value": "UZ" },
        { "text": "Vanuatu", "value": "VU" },
        { "text": "Venezuela", "value": "VE" },
        { "text": "Viet Nam", "value": "VN" },
        { "text": "Virgin Islands, British", "value": "VG" },
        { "text": "Virgin Islands, U.S.", "value": "VI" },
        { "text": "Wallis and Futuna", "value": "WF" },
        { "text": "Western Sahara", "value": "EH" },
        { "text": "Yemen", "value": "YE" },
        { "text": "Zambia", "value": "ZM" },
        { "text": "Zimbabwe", "value": "ZW" }
    ];

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        
        createUserWithEmailAndPassword(firebase, data.email, data.password)
        .then(() => {
            navigate('/connect-wallet');
        })
        .catch((error) => {
            const errorMessage = error.message;
            setError(errorMessage.split(': ')[1]);
        });
    }

    return (
        <div className="sign-up pt-5 pb-5">
            <Header />
            <Container className="d-flex flex-column align-items-center justify-content-center h-100">
                <Col xs={6} className="mt-5">
                    <Form className="signup-form mt-5" onSubmit={handleSubmit}>

                        <Form.Group className="input-primary mb-5">
                            <Form.Label className="label">Email</Form.Label>
                            <Form.Control required id="email" name="email" type="text" placeholder="Email" />
                        </Form.Group>

                        <Form.Group className="input-primary mb-5">
                            <Form.Label className="label">Password</Form.Label>
                            <Form.Control required id="password" name="password" type="password" placeholder="Password" />
                        </Form.Group>

                        { error &&  <Form.Label className="label">{error}</Form.Label> } 


                        {/* <Form.Group className="input-primary mb-5">
                            <Form.Label className="label">First Name</Form.Label>
                            <Form.Control required id="firstname" name="firstname" type="text" placeholder="First name" />
                        </Form.Group>

                        <Form.Group className="input-primary mb-5">
                            <Form.Label className="label">Last Name</Form.Label>
                            <Form.Control required id="lastname" name="lastname" type="text" placeholder="Last name" />
                        </Form.Group>

                        <Form.Group className="input-primary mb-5">
                            <Form.Label className="label">IMBD Profile Link</Form.Label>
                            <Form.Control required id="imbdlink" name="imdblink" type="text" placeholder="IMBD profile link" />
                        </Form.Group>

                        <Form.Group className="select-primary mb-5">
                            <Form.Label className="label">Country</Form.Label>
                            <Form.Select defaultValue="country" id="country" name="country" aria-label="country">
                                <option value="country" disabled>Country</option>
                                {countryList.map((item) => (
                                    <option value={item.text}>{item.text}</option>
                                ))}
                            </Form.Select>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </Form.Group>

                        <Form.Group className="input-primary mb-5">
                            <Form.Label className="label">Street Address</Form.Label>
                            <Form.Control required id="street-address" name="street-address" type="text" placeholder="Street address" />
                        </Form.Group>

                        <Form.Group className="input-primary mb-5">
                            <Form.Label className="label">Street Address Link 2</Form.Label>
                            <Form.Control id="street-address-2" name="street-address-2" type="text" placeholder="Street address" />
                        </Form.Group>

                        <div className="input-pair d-flex flex-row justify-content-between">
                            <Form.Group className="input-primary mb-5">
                                <Form.Label className="label">City</Form.Label>
                                <Form.Control required id="city" name="city" type="text" placeholder="City" />
                            </Form.Group>
                            <Form.Group className="input-primary mb-5">
                                <Form.Label className="label">State/Province</Form.Label>
                                <Form.Control required id="state" name="state" type="text" placeholder="State" />
                            </Form.Group>
                        </div>

                        <Form.Group className="input-primary mb-5">
                            <Form.Label className="label">Postal/Zip-Code</Form.Label>
                            <Form.Control required id="postal" name="postal" type="text" placeholder="Zip code" />
                        </Form.Group>

                        <Form.Group className="input-primary mb-5">
                            <Form.Label className="label">Company Name</Form.Label>
                            <Form.Control required id="company" name="company" type="text" placeholder="Company name" />
                        </Form.Group>

                        <Form.Group className="input-primary mb-5">
                            <Form.Label className="label">Phone Number</Form.Label>
                            <Form.Control required id="phone" name="phone" type="text" placeholder="+00 0000 000" />
                        </Form.Group>

                        <Form.Group className="mb-5">
                            <Form.Label className="label">Date of Birth</Form.Label>
                            <CustomDatePicker />
                        </Form.Group>

                        <Form.Group className="select-primary mb-5">
                            <Form.Label className="label">User Role</Form.Label>
                            <Form.Select defaultValue="role" id="role" name="role" aria-label="role">
                                <option value="role" disabled>Role</option>
                                {rolesList.map((item) => (
                                    <option value={item}>{item}</option>
                                ))}
                            </Form.Select>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </Form.Group>

                        <Form.Group className="checkbox-primary mb-5">
                            <Form.Check
                                required
                                id="checkbox"
                                type="checkbox"
                                label="I certify that I’m 18 years or older, and agree to the terms and conditions."
                            />
                        </Form.Group> */}

                        <div className="d-flex justify-content-center mb-5">
                            <Button
                                type="submit"
                                className="button-secondary"
                                style={{ width: "213px" }}
                            >
                                Submit
                            </Button>
                        </div>

                    </Form>
                </Col>
            </Container>
            <Footer />
        </div>
    );
});

export default SignUp;