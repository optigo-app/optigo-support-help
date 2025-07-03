// export const FaqList = [
//   {
//     "question": "Q. Software asks for OTP while login?",
//     "answer": `<p>Software will ask for OTP to only those employees whose Roaming rights are enabled.</p><p><b>Note:</b> If you have not activated SMS facility for your Optigo apps copy, insert 1234 in OTP to login.</p><p>If yes, then follow steps mentioned below:</p><ul><li>Go to <b>User > Employee > Show All Employee</b> and edit profile of any particular employee by clicking on User code.</li><li>Now make sure that mobile phone number is added in Notification Info section of employee and also same is verified or not. Click here to know steps to verify mobile number.</li><li>Now particular employee will receive an OTP on verified mobile phone number which he/she has to use for login.</li></ul>`
//   },
//   {
//     "question": "Q.Recipient did not receive mail or sms despite of being successfully sent from Optigo.",
//     "answer": `<p>Do not worry, sometime due to issue in mobile networks, sms delivery may take longer than intended. In case the receiver does not receive the sms within 1 hour, please contact customer support.</p><p>In case of email, check spam folder or it could be due to temporary issue in email services of recipient.</p>`
//   },
//   {
//     "question": "Q.What is RFID? How is it different from barcode?",
//     "answer": `<p>An RFID (Radio Frequency Identification) tag contains electronically stored information of a product. This RFID tag responds to an RFID scanner, when present within a specific range (up to several feet), automatically reads the data from it.</p><p>RFID scanning is not all that different from barcode scanning. The important aspect that gives RFID an edge over barcode is that you don’t have to point the scanner directly at the tag to read its information.</p>`
//   },
//   {
//     "question": "Q.Details of an invoice have been altered by someone. How to track logs of such activity?",
//     "answer": `<p>To view logs, open System Admin module and go to <b>Log Report > Transaction Log.</b></p><p>Now first click on ‘All’ button to remove date filter and then search for that particular invoice in search box provided.</p>`
//   },
//   {
//     "question": "Q.How to give rights of Excel export feature to employee?",
//     "answer": `<img src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/1.png">`
//   },
//   {
//     "question": "Q.How to give rights for login into Optigo apps to employee? OR You have no login access(Error3)’ message showing to employee while login.",
//     "answer": `<p>To give login access to employee, you need to activate Login for individual employee. For this, you must login with Admin login and then go to <b>User > Employee > Show All Employee.</b></p><img src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/2.png">`
//   },
//   {
//     "question": "Q.What is the use of check-box provided in front of every e-mail text box in Notification Info?",
//     "answer": `<img src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/3.png">`
//   },
//   {
//     "question": "Q.What is Advance Search? How can I use it?",
//     "answer": `<p>Optigo apps has an advanced search feature that lets you get the information you’re looking for, quickly and efficiently.</p><p><b>Note:</b> The advanced search is available for many pages like design master, stock book, Jewellery book, etc., and the below example focuses on stock book.</p><ul><li>Open the <b>Sales CRM</b> module.</li><li>Now go to <b> Books Keeping > Stock Book,</b> you’ll be able to find the icon that opens the advance search feature.</li><li>The advanced search module will now appear, allowing you to refine your search based on various parameters available.</li></ul><img src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/4.png">`
//   },
//   {
//     "question": "Q.Sales invoice is locked. How to unlock it?",
//     "answer": `<p><b>In Admin login: </b></p><ul><li>It could be due to invoice has been archived. You can restore same by clicking on ‘Restore’ button.</li><img src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/5.png"><li>Another reason is the account of that particular customer/vendor has been freezed. If so, you will see lock image in Freeze column same as shown in above image. To reset freeze action. Go to <b>Account > Account > Account Freeze</b> and click on reset.</li></ul><p><b>In Employee login: </b></p><ul><li>Apart from above mentioned points, another reason is the employee is not having access to edit invoice.</li><li>To give editing access to employee, you must login with Admin login and then go to <b>User > Employee > Show All Employee</b> and edit profile of particular employee by clicking on User code.</li><li>Now go to <b>Quick Access</b> in <b>User Permission</b> section and grant access.</li><img src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/6.png"></ul>`
//   },
//   {
//     "question": "Q.How to verify mobile phone number?",
//     "answer": `<p>To verify mobile number of any user, go to Notification Info section in profile of user and click on ‘verify’ link provided along with mobile number input box.</p><img src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/7.png"><p>Now click on ‘Send OTP’ and the user will receive one OTP on this mobile number. The text message also contains one link to verify number. You can verify number by entering OTP as shown below or the user can itself verify by clicking on link provided in text message.</p><img src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/8.png">`
//   },
//   {
//     "question": "Q.Job is not showing anywhere. OR How to track whole history of any particular job/product?",
//     "answer": `<p>To track any job/product, use Quick Search feature available in <b>Sales CRM > Tags > Quick Search.</b></p><p>Just enter job number to view current status of job and click on ‘Show Detail’ for complete history as shown below. If you have your own manufacturing unit and want to view history of manufacturing process, click on ‘Manufacturing’ tab.</p><img src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/9.png">`
//   },
//   {
//     "question": "1. I am not able to update rate in employee login, Also I am not able to view customize all option?",
//     "answer": `<p>Employee login for billing process for full access of billing following rights must be given from <b>User > User Permission > Access Permission.</b></p><img src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/10.png">`
//   },
//   {
//     "question": "2. I am not able to get customize all option in Admin login",
//     "answer": `<p>If you are not able to view customize all option in edit option then it means that there are some jobs in that particular bill which are processed in further transactions such as sale return, sale, etc.</p><img class=\"cls_img\" src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/11.png"><p>Let us take above example. In this job no 1/276 has done as sale return. So we are not able to view customize all option.</p>`
//   },
//   {
//     "question": "3. Why diamond entries not coming in ledger?",
//     "answer": `<p>Diamond entries will go in Accounts only if diamonds are of customer and rate is not applied in bill. If diamonds are of company and rate is not applied then such diamonds will not show in ledger. You can check from here whether diamonds are of Customer or of company.</p><img class=\"cls_img\" src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/12.png">`
//   },
//   {
//     "question": "4. How to get metal entry in ledger?",
//     "answer": `<p>Usually in wholesale jewelry business, jewelry deals are based on metal to metal. (Customer gives metal to company and in return company makes bill in terms of metal). So for making such bills you need to make metal rate 0.00. For such bills Pure weight will be calculated as <b>(applied tunch * Net Weight)/100</b>. By default tunch will come from <b>User > User > Customer > Purity Ratio.</b></p><img class=\"cls_img\" src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/13.png">`
//   },
//   {
//     "question": "5. Why I am getting lock in Bill for update and delete?",
//     "answer": `<p><b>In Admin login: </b></p><ul><li>It could be due to invoice has been archived. You can restore same by clicking on ‘Restore’ button.</li><img src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/5.png"><li>Another reason is the account of that particular customer/vendor has been freeze. If so, you will see lock image in Freeze column same as shown in above image. To reset freeze action. Go to <b>Account > Account > Account Freeze</b> and click on reset.</li><img src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/14.png"></ul><p><b>In Employee login: </b></p><ul><li>Apart from above mentioned points, another reason is the employee is not having access to edit invoice.</li><li>To give editing access to employee, you must login with Admin login and then go to <b>User > Employee > Show All Employee</b> and edit profile of particular employee by clicking on User code.</li><li>Now go to <b>Quick Access</b> in <b>User Permission</b> section and grant access.</li><img src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/6.png"></ul>`
//   },
//   {
//     "question": "6. How to make Bill using RFID?",
//     "answer": `<p>If you have RFID facility, then you can make bill through our different page as <b>SalesCRM > Books Keeping > Quick Scan</b></p><img src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/15.png">`
//   },
//   {
//     "question": "7. I have forgotten to set tax in Bill. How to apply tax in already added bill?",
//     "answer": `<p>We do have feature of Reset Tax which will be only available in Admin login from which you can update tax as shown below.</p><img src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/16.png">`
//   },
//   {
//     "question": "8. I am not getting Company’s and Customers PAN no. , GST no. in Bill Print?",
//     "answer": `<p><b>Step1:</b>Fill company’s PAN GST information from System Admin > Company Info > Default Company Info</p><img src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/17.png"><p><b>Step2:</b>Fill up Customers GST PAN CST number from User > User > Customer > Company Info</p><img src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/18.png"><p><b>Step3:</b>Delete all items from bill and again add in bill. Then only it will display in print</p><img class=\"cls_img\" src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/19.png">`
//   },
//   {
//     "question": "9. You can add customer from User > User > customer. If retailer customer you can add customer from SalesCRM > Books Keeping > Retailer Registration",
//     "answer": ``
//   },
//   {
//     "question": "10. Job not getting scanned or job getting failed while billing?",
//     "answer": `<p>There are many reasons in which jobs may show as invalid job</p><p><b>Condition1:</b>Job is not in Hand Status</p><p><b>Condition2:</b> Although job is on Hand, jobs FG Stock Locker is different from scanned job FG stock locker. It may be possible that you do not have rights of all FG Stock Locker.</p><p><b>Condition3:</b>Job scanned is of different customer than invoice customer. Also job is not of company.</p><p><b>Condition4:</b>Sometimes company jobs when scanned get failed. In this condition you need to go to <b>system admin > Company info > default.Company info</b> and check customer code. You need to update customer code and click on Save and Sync.</p><p><b>Condition5:</b>Check for Jobs QC Status whether it is approved or not. However this condition will be only valid if your company is using QC Process.</p>`
//   },
//   {
//     "question": "11. How do I know if by default rates not coming in company diamond and Color Stone?",
//     "answer": `<p>If default rates are not coming in diamond and color stone then it will highlight in different color as shown below</p><img class=\"cls_img\" src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/20.png">`
//   },
//   {
//     "question": "12. Why Company diamond and Color Stone rates not coming by default?",
//     "answer": `<p><b>Step1:</b> Check Customers Price Policy selected from <b>User > User > Customer>Policy</b></p><img class=\"cls_img\" src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/21.png"><p><b>Step2:</b>Check criteria of Shape, Quality, Color and Pointer wise OR check criteria of Shape, Quality, Color and Size Wise from button.</b></p><img src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/22.png">`
//   },
//   {
//     "question": "13. Why job deleted not showing in Bill neither in Stock Book?",
//     "answer": `<p>This condition happens when you delete job as set for delete one time only. You haven’t clicked on delete button while you update bill.</p><img class=\"cls_img\" src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/23.png">`
//   },
//   {
//     "question": "14. Although tax applied why tax amount not showing in bill?",
//     "answer": `<p>This happens as although you have selected tax but you have not set percentage in it. You need to set percentage in it through <b>Master and Policy Apps > Account > Item Master</b></p><img src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/24.png">`
//   },
//   {
//     "question": "15. Why print not showing in employee login?",
//     "answer": `<p>Check bill status in grid is pending or not. If pending then updates it as Verified then you will be able to view all prints.</p>`
//   },
//   {
//     "question": "16. Why I am not able to proceed further after selecting Customer?",
//     "answer": `<p><b>Condition1:</b>Job is not in Hand Status</p><p><b>Condition2:</b>Customers Price Policy has been expired.</p><p>You can set both of the things through <b>User > User > Customer > policy</b></p><img src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/25.png">`
//   },
//   {
//     "question": "17. Why my Bill highlighting pink in Color?",
//     "answer": `<p>It happens when you click on Cancel Bill. On such operation all the jobs will come back in Stock and bill gets cancelled.</p><img src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/26.png"><p><b>Notes:</b>Cancelled bill cannot be roll backed in any way.</p>`
//   },
//   {
//     "question": "18. Details of an invoice have been altered by someone. How to track logs of such activity?",
//     "answer": `<p>You can view all transactions related to billing in <b>System Admin > Log Report > Transaction Log</b></p><img src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/27.png">`
//   },
//   {
//     "question": "19. From where wastage and making charge comes in bill by default?",
//     "answer": `<p>By default wastage will come as Sales Wastage from Style master + Sales Wastage from Wastage Master – Wastage Disc from Labour Set</p><p>Let us take following example design no MR6 we have added sales wastage as 2 from (SalesCRM > Sales > Design Master)</p><img src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/28.png"><p>Let us suppose this design has come from FG Purchase PSV_Jewels and collection, category and subcategory as Men, Ring and Fancy. We have added following entry in <b>Masters Apps > Price Master > Wastage Price</b></p><img src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/28.png"><p>Now I add in <b>Master and Policy Apps > Price Master > Labour Set</b></p><img src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/29.png"><p>Suppose customers labor set applied as G500 then by default wastage for this job will be 2+2-(-2)=6</p><img src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/30.png"><p>In the same way Making charges will be equal to Making charges as on Style master + Making charges from Labour Set</p>`
//   },
//   {
//     "question": "20. How can we set fixed making by default in bill?",
//     "answer": `<p>You can set fixed labor and set fixed grams through <b>Master and Policy Apps > Price Master > Labour set</b> as shown below</p><img src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/31.png">`
//   },
//   {
//     "question": "21. How do we get pc wise price in Color stone?",
//     "answer": `<p>You can set pc wise price policy through <b>Master and Policy Apps > Price Master > Color Stone Price.</b></p><p>While importing color stone sheet Need to write applied on pcs as Yes.</p><img src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/32.png">`
//   },
//   {
//     "question": "22. How Misc. Ceiling process works in billing?",
//     "answer": `<ol><li>Check for labor set applied to Customer</li><li>In labor set check for Misc. ceiling value applied as percentage or in weight</li><li>Check for FG Purchase entry which misc. added in it.</li></ol><p>In this process according to ceiling calculation, Misc. Weight will get deducted from actual weight and will get added to net weight. Let us take following job in FG Purchase.</p><img src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/33.png"><p>Applied ceiling can be set from Labour Set. Ceiling will be applicable only for Misc. whose add in Gross Weight is Yes.</p><p>If applied ceiling value is less than 100% then misc. in sale will be Misc. Actual Weight * Applied Ceiling%. And In net weight total weight will be added as Actual Weight – New Misc. Weight.</p><p>If applied ceiling value is less than Actual Weight then in Misc. it will be Actual Weight – Applied Ceiling and in net weight total weight will be added as Applied Ceiling value.</p><p>In above example, Total new misc. and Net weight is as given in Summary.</p>`
//   },
//   {
//     "question": "23. How to apply labor in percentage?",
//     "answer": `<p>We do have two options for applying labor on percentage.</p><ol><li>Labour percentage according to Design Master.</li><li>Labour Percentage according to Labor master.</li></ol><p>This can be set through <b>Masters > Price Master> Labor Set</b> Option as Shown Below</p><img src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/34.png"><p>If percentage applied on design master then it will work as Making Charge applied in Design Master + ( Making Charge applied in Design Master)*percentage of making charge in labor set</p><p>If percentage applied on Gold Rate then it will work as Gold Rate applied in Sale + ( Gold Rate applied in Sale)*percentage of making charge in labor set</p>`
//   },
//   {
//     "question": "24. What if my jobs are in different lockers and want to sale it in default locker ?",
//     "answer": `<p>We do have option of setting locker as point of Sale (POS) in Masters>> SalesCRM>FG Stock Locker . If selected such locker as POS then you can Sale job of any locker which are in stock here.</p><img src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/35.png">`
//   },
//   {
//     "question": "25. How to apply loss for metal while billing (say for eg: apply polish charges in metal )?",
//     "answer": `<p>You can apply loss in billing through WT loss tab in customize All and Job wise customize button . However by default loss will be fetch from</p><ol><li>Metal loss applied in Masters and Policy Apps>Price Master>Labor Set</li><li>Metal loss Applied in Masters > PD > Subcategory</li></ol><img src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/36.png">`
//   },
//   {
//     "question": "26.How to sale MRP jobs in Sale?",
//     "answer": `<p>Add MRP in jobs through SalesCRM> Books Keeping>MRP Based flow.</p><p>Then add such jobs in normal sale. For such jobs only mrp price will come and other details such diamond,colorstone,labor,etc. will not come. You can apply discount in it.</p>`
//   },
//   {
//     "question": "FAQs related to FG Purchase",
//     "answer": ``
//   },
//   {
//     "question": "1.How Mark Up is added while FG Purchase ?",
//     "answer": `<p>We have feature of mark up from which you can add mark-up charges while FG Purchase according to percentage or amount wise. You can add this option through diamond, colorstone and misc.</p><img class=\"cls_img\" src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/37.png"><p>Suppose in job 1/1 you have added Purchase Price as 500. You have added Sale Mark up as percentage and applied percentage in it. Then Sale price will be 500+ (6*500)/100=530.</p>`
//   },
//   {
//     "question": "2.What is the use of Quick Purchase?",
//     "answer": `<p>If you need to make entries in bulk then use Quick Purchase .For more details of this refer our help file for page<b>(SalesCRM > Manufacturer Mgmt. > Quick Tagging)</b></p>`
//   },
//   {
//     "question": "3.How you can split jobs in FG Purchase?",
//     "answer": `<p>This case comes when you have entry of necklace and you are managing its different parts as chain, kundan, etc. For this you can manage same job entry and use sequence purchase along with following icon:</p><img class=\"cls_img\" src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/38.png"><p>Here job number will remain same along with different quantity say for e.g.: 1/1, 2/1, etc….</p>`
//   },
//   {
//     "question": "4. Which type of material you can add while FG Purchase which is in Gms and not Ctw ?",
//     "answer": `<p>For adding such entries you need to add it in MISC material type. In misc. we do have option whether you want to add such entries in gms or not. You can add misc. charges from icon in invoice details and other it will show in making Amount at all places. We do have tags too which shows misc. charges in it. You can view it from <b>SalesCRM > Tags > Tag Print</b></p>`
//   },
//   {
//     "question": "5. What is the meaning of supplier while issuing material?",
//     "answer": `<p>We do have manufacturer selection in FG Purchase. If you select manufacturer in it, then price will come according to price master, if you select company or customer then price will not fetch in it.</p><img src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/39.png">`
//   },
//   {
//     "question": "6. How you need to issue diamond and color stone in FG Purchase for genuine entries ?",
//     "answer": `<p>If in FG Purchase material used is of company then we need to issue material to manufacturer through issue material <b>(SalesCRM > Manufacturer Management > Issue Material / Job Wise Issue Material).</b></p><p>Such diamonds manufacturer wise will show in FG Purchase I button as shown below</p><img src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/40.png"><p>Here you will be able to use remaining diamonds as Total Issued – FG Studded – Repairing Studded – Return Material.</p><p>You can issue job wise diamond to FG Purchase too if collection, category, manufacturer matches with job wise issued diamonds.</p><img class=\"cls_img\" src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/41.png"><p><b>Special Notes :</b>If you have added diamonds and colorstone manually then it will not get any effect in diamond info report.</p>`
//   },
//   {
//     "question": "7.When you can edit job in FG Purchase?",
//     "answer": `<p>You can edit job in FG Purchase at any time condition that job should be On Hand Stock.</p>`
//   },
//   {
//     "question": "8. How to issue Mount in FG Purchase?",
//     "answer": `<p>You can issue Mount through FG Purchase in two ways:</p><ol><li>Issue mount to manufacturer and then stud it in FG Purchase</li><img class=\"cls_img\" src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/42.png"><li>Issue mount directly from Stock</li><img class=\"cls_img\" src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/43.png"><li>If mount is of manufacturer</li><img class=\"cls_img\" src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/44.png"></ol>`
//   },
//   {
//     "question": "9.How you can add Sales Wastage while FG Purchase ?",
//     "answer": `<p>It will come while adding new Job in FG Purchase</p><img class=\"cls_img\" src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/45.png">`
//   },
//   {
//     "question": "10. How to add opening entries in FG Purchase ?",
//     "answer": `<p>You can add opening entries in FG purchase by purchasing it from default customer as shown below.</p><img class=\"cls_img\" src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/46.png">`
//   },
//   {
//     "question": "11. How auto design number system works while creating new design?",
//     "answer": `<p>Auto design works along with combination of collection and category with prefix set in it. You can set it from <b>Masters and Policy > PD > Mapping.</b></p><img src="https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/47.png"><p>It will work on total count purchased +1.</p><p>For adding postfix you need to add prefix+ “++” + postfix. Say for example if I have set it as NCK++E then design number will be generated as nck1e, nck2e,etc..</p>`
//   }
// ]



export const FaqList = [
  {
    "id": 1,
    "category": "Login & Authentication",
    "question": "Software asks for OTP while login?",
    "answer": "<p>Software will ask for OTP to only those employees whose Roaming rights are enabled.</p><p><strong>Note:</strong> If you have not activated SMS facility for your Optigo apps copy, insert 1234 in OTP to login.</p><p>If yes, then follow steps mentioned below:</p><ul><li>Go to <strong>User > Employee > Show All Employee</strong> and edit profile of any particular employee by clicking on User code.</li><li>Now make sure that mobile phone number is added in Notification Info section of employee and also same is verified or not. Click here to know steps to verify mobile number.</li><li>Now particular employee will receive an OTP on verified mobile phone number which he/she has to use for login.</li></ul>",
    "tags": ["OTP", "login", "authentication", "roaming"]
  },
  {
    "id": 2,
    "category": "Communication",
    "question": "Recipient did not receive mail or SMS despite being successfully sent from Optigo",
    "answer": "<p>Do not worry, sometime due to issue in mobile networks, SMS delivery may take longer than intended. In case the receiver does not receive the SMS within 1 hour, please contact customer support.</p><p>In case of email, check spam folder or it could be due to temporary issue in email services of recipient.</p>",
    "tags": ["SMS", "email", "delivery", "troubleshooting"]
  },
  {
    "id": 3,
    "category": "Technology",
    "question": "What is RFID? How is it different from barcode?",
    "answer": "<p>An RFID (Radio Frequency Identification) tag contains electronically stored information of a product. This RFID tag responds to an RFID scanner, when present within a specific range (up to several feet), automatically reads the data from it.</p><p>RFID scanning is not all that different from barcode scanning. The important aspect that gives RFID an edge over barcode is that you don't have to point the scanner directly at the tag to read its information.</p>",
    "tags": ["RFID", "barcode", "scanning", "technology"]
  },
  {
    "id": 4,
    "category": "System Administration",
    "question": "Details of an invoice have been altered by someone. How to track logs of such activity?",
    "answer": "<p>To view logs, open System Admin module and go to <strong>Log Report > Transaction Log.</strong></p><p>Now first click on 'All' button to remove date filter and then search for that particular invoice in search box provided.</p>",
    "tags": ["logs", "invoice", "tracking", "system admin"]
  },
  {
    "id": 5,
    "category": "User Permissions",
    "question": "How to give rights of Excel export feature to employee?",
    "answer": "<p>To give Excel export rights to an employee, you need to configure user permissions in the system.</p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/1.png\" alt=\"Excel export permissions\" />",
    "tags": ["excel", "export", "permissions", "employee"]
  },
  {
    "id": 6,
    "category": "User Permissions",
    "question": "How to give rights for login into Optigo apps to employee? OR 'You have no login access (Error3)' message showing to employee while login",
    "answer": "<p>To give login access to employee, you need to activate Login for individual employee. For this, you must login with Admin login and then go to <strong>User > Employee > Show All Employee.</strong></p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/2.png\" alt=\"Employee login access setup\" />",
    "tags": ["login", "access", "employee", "permissions", "error3"]
  },
  {
    "id": 7,
    "category": "Notifications",
    "question": "What is the use of check-box provided in front of every e-mail text box in Notification Info?",
    "answer": "<p>The checkbox in front of email text boxes in Notification Info is used to enable or disable email notifications for specific events or updates.</p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/3.png\" alt=\"Email notification checkbox\" />",
    "tags": ["email", "notifications", "checkbox", "settings"]
  },
  {
    "id": 8,
    "category": "Search Features",
    "question": "What is Advance Search? How can I use it?",
    "answer": "<p>Optigo apps has an advanced search feature that lets you get the information you're looking for, quickly and efficiently.</p><p><strong>Note:</strong> The advanced search is available for many pages like design master, stock book, Jewellery book, etc., and the below example focuses on stock book.</p><ul><li>Open the <strong>Sales CRM</strong> module.</li><li>Now go to <strong>Books Keeping > Stock Book,</strong> you'll be able to find the icon that opens the advance search feature.</li><li>The advanced search module will now appear, allowing you to refine your search based on various parameters available.</li></ul><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/4.png\" alt=\"Advanced search interface\" />",
    "tags": ["search", "advanced search", "stock book", "filtering"]
  },
  {
    "id": 9,
    "category": "Invoice Management",
    "question": "Sales invoice is locked. How to unlock it?",
    "answer": "<p><strong>In Admin login:</strong></p><ul><li>It could be due to invoice has been archived. You can restore same by clicking on 'Restore' button.</li><li>Another reason is the account of that particular customer/vendor has been freezed. If so, you will see lock image in Freeze column. To reset freeze action, go to <strong>Account > Account > Account Freeze</strong> and click on reset.</li></ul><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/5.png\" alt=\"Invoice restore and freeze options\" /><p><strong>In Employee login:</strong></p><ul><li>Apart from above mentioned points, another reason is the employee is not having access to edit invoice.</li><li>To give editing access to employee, you must login with Admin login and then go to <strong>User > Employee > Show All Employee</strong> and edit profile of particular employee by clicking on User code.</li><li>Now go to <strong>Quick Access</strong> in <strong>User Permission</strong> section and grant access.</li></ul><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/6.png\" alt=\"Employee permission settings\" />",
    "tags": ["invoice", "locked", "unlock", "permissions", "archive"]
  },
  {
    "id": 10,
    "category": "User Management",
    "question": "How to verify mobile phone number?",
    "answer": "<p>To verify mobile number of any user, go to Notification Info section in profile of user and click on 'verify' link provided along with mobile number input box.</p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/7.png\" alt=\"Mobile verification interface\" /><p>Now click on 'Send OTP' and the user will receive one OTP on this mobile number. The text message also contains one link to verify number. You can verify number by entering OTP as shown below or the user can itself verify by clicking on link provided in text message.</p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/8.png\" alt=\"OTP verification process\" />",
    "tags": ["mobile", "verification", "OTP", "phone number"]
  },
  {
    "id": 11,
    "category": "Job Tracking",
    "question": "Job is not showing anywhere. OR How to track whole history of any particular job/product?",
    "answer": "<p>To track any job/product, use Quick Search feature available in <strong>Sales CRM > Tags > Quick Search.</strong></p><p>Just enter job number to view current status of job and click on 'Show Detail' for complete history as shown below. If you have your own manufacturing unit and want to view history of manufacturing process, click on 'Manufacturing' tab.</p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/9.png\" alt=\"Job tracking interface\" />",
    "tags": ["job tracking", "quick search", "history", "manufacturing"]
  },
  {
    "id": 12,
    "category": "Billing - Employee Access",
    "question": "I am not able to update rate in employee login, Also I am not able to view customize all option?",
    "answer": "<p>Employee login for billing process for full access of billing following rights must be given from <strong>User > User Permission > Access Permission.</strong></p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/10.png\" alt=\"Billing access permissions\" />",
    "tags": ["billing", "employee", "permissions", "rate update", "customize"]
  },
  {
    "id": 13,
    "category": "Billing - Admin Access",
    "question": "I am not able to get customize all option in Admin login",
    "answer": "<p>If you are not able to view customize all option in edit option then it means that there are some jobs in that particular bill which are processed in further transactions such as sale return, sale, etc.</p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/11.png\" alt=\"Customize all option limitation\" /><p>Let us take above example. In this job no 1/276 has done as sale return. So we are not able to view customize all option.</p>",
    "tags": ["billing", "admin", "customize all", "transactions"]
  },
  {
    "id": 14,
    "category": "Billing - Diamond Entries",
    "question": "Why diamond entries not coming in ledger?",
    "answer": "<p>Diamond entries will go in Accounts only if diamonds are of customer and rate is not applied in bill. If diamonds are of company and rate is not applied then such diamonds will not show in ledger. You can check from here whether diamonds are of Customer or of company.</p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/12.png\" alt=\"Diamond entries configuration\" />",
    "tags": ["billing", "diamond", "ledger", "accounts"]
  },
  {
    "id": 15,
    "category": "Billing - Metal Entries",
    "question": "How to get metal entry in ledger?",
    "answer": "<p>Usually in wholesale jewelry business, jewelry deals are based on metal to metal. (Customer gives metal to company and in return company makes bill in terms of metal). So for making such bills you need to make metal rate 0.00. For such bills Pure weight will be calculated as <strong>(applied tunch * Net Weight)/100</strong>. By default tunch will come from <strong>User > User > Customer > Purity Ratio.</strong></p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/13.png\" alt=\"Metal entry ledger setup\" />",
    "tags": ["billing", "metal", "ledger", "wholesale", "purity ratio"]
  },
  {
    "id": 16,
    "category": "Billing - Bill Lock",
    "question": "Why I am getting lock in Bill for update and delete?",
    "answer": "<p><strong>In Admin login:</strong></p><ul><li>It could be due to invoice has been archived. You can restore same by clicking on 'Restore' button.</li><li>Another reason is the account of that particular customer/vendor has been freeze. If so, you will see lock image in Freeze column. To reset freeze action, go to <strong>Account > Account > Account Freeze</strong> and click on reset.</li></ul><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/5.png\" alt=\"Bill restore options\" /><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/14.png\" alt=\"Account freeze management\" /><p><strong>In Employee login:</strong></p><ul><li>Apart from above mentioned points, another reason is the employee is not having access to edit invoice.</li><li>To give editing access to employee, you must login with Admin login and then go to <strong>User > Employee > Show All Employee</strong> and edit profile of particular employee by clicking on User code.</li><li>Now go to <strong>Quick Access</strong> in <strong>User Permission</strong> section and grant access.</li></ul><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/6.png\" alt=\"Employee edit permissions\" />",
    "tags": ["billing", "lock", "permissions", "archive", "freeze"]
  },
  {
    "id": 17,
    "category": "Billing - RFID",
    "question": "How to make Bill using RFID?",
    "answer": "<p>If you have RFID facility, then you can make bill through our different page as <strong>SalesCRM > Books Keeping > Quick Scan</strong></p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/15.png\" alt=\"RFID billing interface\" />",
    "tags": ["billing", "RFID", "quick scan", "technology"]
  },
  {
    "id": 18,
    "category": "Billing - Tax Management",
    "question": "I have forgotten to set tax in Bill. How to apply tax in already added bill?",
    "answer": "<p>We do have feature of Reset Tax which will be only available in Admin login from which you can update tax as shown below.</p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/16.png\" alt=\"Reset tax feature\" />",
    "tags": ["billing", "tax", "reset tax", "admin"]
  },
  {
    "id": 19,
    "category": "Billing - Tax Information",
    "question": "I am not getting Company's and Customers PAN no., GST no. in Bill Print?",
    "answer": "<p><strong>Step1:</strong> Fill company's PAN GST information from System Admin > Company Info > Default Company Info</p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/17.png\" alt=\"Company tax information setup\" /><p><strong>Step2:</strong> Fill up Customers GST PAN CST number from User > User > Customer > Company Info</p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/18.png\" alt=\"Customer tax information setup\" /><p><strong>Step3:</strong> Delete all items from bill and again add in bill. Then only it will display in print</p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/19.png\" alt=\"Bill refresh process\" />",
    "tags": ["billing", "PAN", "GST", "tax information", "print"]
  },
  {
    "id": 20,
    "category": "Customer Management",
    "question": "How to add customer?",
    "answer": "<p>You can add customer from User > User > Customer. If retailer customer you can add customer from SalesCRM > Books Keeping > Retailer Registration</p>",
    "tags": ["customer", "registration", "retailer", "user management"]
  },
  {
    "id": 21,
    "category": "Billing - Job Scanning",
    "question": "Job not getting scanned or job getting failed while billing?",
    "answer": "<p>There are many reasons in which jobs may show as invalid job</p><p><strong>Condition1:</strong> Job is not in Hand Status</p><p><strong>Condition2:</strong> Although job is on Hand, jobs FG Stock Locker is different from scanned job FG stock locker. It may be possible that you do not have rights of all FG Stock Locker.</p><p><strong>Condition3:</strong> Job scanned is of different customer than invoice customer. Also job is not of company.</p><p><strong>Condition4:</strong> Sometimes company jobs when scanned get failed. In this condition you need to go to <strong>system admin > Company info > default Company info</strong> and check customer code. You need to update customer code and click on Save and Sync.</p><p><strong>Condition5:</strong> Check for Jobs QC Status whether it is approved or not. However this condition will be only valid if your company is using QC Process.</p>",
    "tags": ["billing", "job scanning", "hand status", "QC", "stock locker"]
  },
  {
    "id": 22,
    "category": "Billing - Diamond Rates",
    "question": "How do I know if by default rates not coming in company diamond and Color Stone?",
    "answer": "<p>If default rates are not coming in diamond and color stone then it will highlight in different color as shown below</p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/20.png\" alt=\"Rate highlighting indicator\" />",
    "tags": ["billing", "diamond", "color stone", "rates", "highlighting"]
  },
  {
    "id": 23,
    "category": "Billing - Price Policy",
    "question": "Why Company diamond and Color Stone rates not coming by default?",
    "answer": "<p><strong>Step1:</strong> Check Customers Price Policy selected from <strong>User > User > Customer > Policy</strong></p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/21.png\" alt=\"Customer price policy\" /><p><strong>Step2:</strong> Check criteria of Shape, Quality, Color and Pointer wise OR check criteria of Shape, Quality, Color and Size Wise from button.</p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/22.png\" alt=\"Price criteria configuration\" />",
    "tags": ["billing", "price policy", "diamond", "color stone", "criteria"]
  },
  {
    "id": 24,
    "category": "Billing - Job Deletion",
    "question": "Why job deleted not showing in Bill neither in Stock Book?",
    "answer": "<p>This condition happens when you delete job as set for delete one time only. You haven't clicked on delete button while you update bill.</p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/23.png\" alt=\"Job deletion process\" />",
    "tags": ["billing", "job deletion", "stock book", "update"]
  },
  {
    "id": 25,
    "category": "Billing - Tax Configuration",
    "question": "Although tax applied why tax amount not showing in bill?",
    "answer": "<p>This happens as although you have selected tax but you have not set percentage in it. You need to set percentage in it through <strong>Master and Policy Apps > Account > Item Master</strong></p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/24.png\" alt=\"Tax percentage setup\" />",
    "tags": ["billing", "tax", "percentage", "item master"]
  },
  {
    "id": 26,
    "category": "Billing - Print Access",
    "question": "Why print not showing in employee login?",
    "answer": "<p>Check bill status in grid is pending or not. If pending then updates it as Verified then you will be able to view all prints.</p>",
    "tags": ["billing", "print", "employee", "status", "verification"]
  },
  {
    "id": 27,
    "category": "Billing - Customer Selection",
    "question": "Why I am not able to proceed further after selecting Customer?",
    "answer": "<p><strong>Condition1:</strong> Job is not in Hand Status</p><p><strong>Condition2:</strong> Customers Price Policy has been expired.</p><p>You can set both of the things through <strong>User > User > Customer > policy</strong></p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/25.png\" alt=\"Customer policy settings\" />",
    "tags": ["billing", "customer selection", "hand status", "price policy", "expiry"]
  },
  {
    "id": 28,
    "category": "Billing - Bill Status",
    "question": "Why my Bill highlighting pink in Color?",
    "answer": "<p>It happens when you click on Cancel Bill. On such operation all the jobs will come back in Stock and bill gets cancelled.</p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/26.png\" alt=\"Cancelled bill indication\" /><p><strong>Notes:</strong> Cancelled bill cannot be roll backed in any way.</p>",
    "tags": ["billing", "cancelled bill", "pink highlight", "stock return"]
  },
  {
    "id": 29,
    "category": "Billing - Activity Logs",
    "question": "Details of an invoice have been altered by someone. How to track logs of such activity?",
    "answer": "<p>You can view all transactions related to billing in <strong>System Admin > Log Report > Transaction Log</strong></p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/27.png\" alt=\"Transaction log interface\" />",
    "tags": ["billing", "logs", "invoice", "transaction log", "tracking"]
  },
  {
    "id": 30,
    "category": "Billing - Wastage & Making Charges",
    "question": "From where wastage and making charge comes in bill by default?",
    "answer": "<p>By default wastage will come as Sales Wastage from Style master + Sales Wastage from Wastage Master – Wastage Disc from Labour Set</p><p>Let us take following example design no MR6 we have added sales wastage as 2 from (SalesCRM > Sales > Design Master)</p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/28.png\" alt=\"Design master wastage\" /><p>Let us suppose this design has come from FG Purchase PSV_Jewels and collection, category and subcategory as Men, Ring and Fancy. We have added following entry in <strong>Masters Apps > Price Master > Wastage Price</strong></p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/28.png\" alt=\"Wastage price master\" /><p>Now I add in <strong>Master and Policy Apps > Price Master > Labour Set</strong></p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/29.png\" alt=\"Labour set configuration\" /><p>Suppose customers labor set applied as G500 then by default wastage for this job will be 2+2-(-2)=6</p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/30.png\" alt=\"Wastage calculation example\" /><p>In the same way Making charges will be equal to Making charges as on Style master + Making charges from Labour Set</p>",
    "tags": ["billing", "wastage", "making charges", "labour set", "calculation"]
  },
  {
    "id": 31,
    "category": "Billing - Fixed Making",
    "question": "How can we set fixed making by default in bill?",
    "answer": "<p>You can set fixed labor and set fixed grams through <strong>Master and Policy Apps > Price Master > Labour set</strong> as shown below</p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/31.png\" alt=\"Fixed making configuration\" />",
    "tags": ["billing", "fixed making", "labour set", "grams"]
  },
  {
    "id": 32,
    "category": "Billing - Color Stone Pricing",
    "question": "How do we get pc wise price in Color stone?",
    "answer": "<p>You can set pc wise price policy through <strong>Master and Policy Apps > Price Master > Color Stone Price.</strong></p><p>While importing color stone sheet Need to write applied on pcs as Yes.</p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/32.png\" alt=\"Color stone pc wise pricing\" />",
    "tags": ["billing", "color stone", "pc wise price", "import"]
  },
  {
    "id": 33,
    "category": "Billing - Misc Ceiling",
    "question": "How Misc. Ceiling process works in billing?",
    "answer": "<ol><li>Check for labor set applied to Customer</li><li>In labor set check for Misc. ceiling value applied as percentage or in weight</li><li>Check for FG Purchase entry which misc. added in it.</li></ol><p>In this process according to ceiling calculation, Misc. Weight will get deducted from actual weight and will get added to net weight. Let us take following job in FG Purchase.</p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/33.png\" alt=\"Misc ceiling process\" /><p>Applied ceiling can be set from Labour Set. Ceiling will be applicable only for Misc. whose add in Gross Weight is Yes.</p><p>If applied ceiling value is less than 100% then misc. in sale will be Misc. Actual Weight * Applied Ceiling%. And In net weight total weight will be added as Actual Weight – New Misc. Weight.</p><p>If applied ceiling value is less than Actual Weight then in Misc. it will be Actual Weight – Applied Ceiling and in net weight total weight will be added as Applied Ceiling value.</p><p>In above example, Total new misc. and Net weight is as given in Summary.</p>",
    "tags": ["billing", "misc ceiling", "weight calculation", "labour set"]
  },
  {
    "id": 34,
    "category": "Billing - Labor Percentage",
    "question": "How to apply labor in percentage?",
    "answer": "<p>We do have two options for applying labor on percentage.</p><ol><li>Labour percentage according to Design Master.</li><li>Labour Percentage according to Labor master.</li></ol><p>This can be set through <strong>Masters > Price Master > Labor Set</strong> Option as Shown Below</p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/34.png\" alt=\"Labor percentage options\" /><p>If percentage applied on design master then it will work as Making Charge applied in Design Master + ( Making Charge applied in Design Master)*percentage of making charge in labor set</p><p>If percentage applied on Gold Rate then it will work as Gold Rate applied in Sale + ( Gold Rate applied in Sale)*percentage of making charge in labor set</p>",
    "tags": ["billing", "labor percentage", "design master", "gold rate"]
  },
  {
    "id": 35,
    "category": "Billing - Stock Locker",
    "question": "What if my jobs are in different lockers and want to sale it in default locker?",
    "answer": "<p>We do have option of setting locker as point of Sale (POS) in Masters >> SalesCRM > FG Stock Locker. If selected such locker as POS then you can Sale job of any locker which are in stock here.</p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/35.png\" alt=\"POS locker configuration\" />",
    "tags": ["billing", "stock locker", "POS", "default locker"]
  },
  {
    "id": 36,
    "category": "Billing - Metal Loss",
    "question": "How to apply loss for metal while billing (say for eg: apply polish charges in metal)?",
    "answer": "<p>You can apply loss in billing through WT loss tab in customize All and Job wise customize button. However by default loss will be fetch from</p><ol><li>Metal loss applied in Masters and Policy Apps > Price Master > Labor Set</li><li>Metal loss Applied in Masters > PD > Subcategory</li></ol><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/36.png\" alt=\"Metal loss configuration\" />",
    "tags": ["billing", "metal loss", "polish charges", "weight loss", "customize"]
  },
  {
    "id": 37,
    "category": "Billing - MRP",
    "question": "How to sale MRP jobs in Sale?",
    "answer": "<p>Add MRP in jobs through SalesCRM > Books Keeping > MRP Based flow.</p><p>Then add such jobs in normal sale. For such jobs only mrp price will come and other details such diamond, colorstone, labor, etc. will not come. You can apply discount in it.</p>",
    "tags": ["billing", "MRP", "sale", "discount", "pricing"]
  },
  {
    "id": 38,
    "category": "FG Purchase",
    "question": "How Mark Up is added while FG Purchase?",
    "answer": "<p>We have feature of mark up from which you can add mark-up charges while FG Purchase according to percentage or amount wise. You can add this option through diamond, colorstone and misc.</p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/37.png\" alt=\"Mark up configuration\" /><p>Suppose in job 1/1 you have added Purchase Price as 500. You have added Sale Mark up as percentage and applied percentage in it. Then Sale price will be 500+ (6*500)/100=530.</p>",
    "tags": ["FG purchase", "mark up", "percentage", "pricing"]
  },
  {
    "id": 39,
    "category": "FG Purchase",
    "question": "What is the use of Quick Purchase?",
    "answer": "<p>If you need to make entries in bulk then use Quick Purchase. For more details of this refer our help file for page <strong>(SalesCRM > Manufacturer Mgmt. > Quick Tagging)</strong></p>",
    "tags": ["FG purchase", "quick purchase", "bulk entries", "tagging"]
  },
  {
    "id": 40,
    "category": "FG Purchase",
    "question": "How you can split jobs in FG Purchase?",
    "answer": "<p>This case comes when you have entry of necklace and you are managing its different parts as chain, kundan, etc. For this you can manage same job entry and use sequence purchase along with following icon:</p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/38.png\" alt=\"Job splitting interface\" /><p>Here job number will remain same along with different quantity say for e.g.: 1/1, 2/1, etc….</p>",
    "tags": ["FG purchase", "job splitting", "sequence", "necklace", "parts"]
  },
  {
    "id": 41,
    "category": "FG Purchase",
    "question": "Which type of material you can add while FG Purchase which is in Gms and not Ctw?",
    "answer": "<p>For adding such entries you need to add it in MISC material type. In misc. we do have option whether you want to add such entries in gms or not. You can add misc. charges from icon in invoice details and other it will show in making Amount at all places. We do have tags too which shows misc. charges in it. You can view it from <strong>SalesCRM > Tags > Tag Print</strong></p>",
    "tags": ["FG purchase", "MISC material", "grams", "weight", "tags"]
  },
  {
    "id": 42,
    "category": "FG Purchase",
    "question": "What is the meaning of supplier while issuing material?",
    "answer": "<p>We do have manufacturer selection in FG Purchase. If you select manufacturer in it, then price will come according to price master, if you select company or customer then price will not fetch in it.</p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/39.png\" alt=\"Supplier selection in FG Purchase\" />",
    "tags": ["FG purchase", "supplier", "manufacturer", "price master"]
  },
  {
    "id": 43,
    "category": "FG Purchase",
    "question": "How you need to issue diamond and color stone in FG Purchase for genuine entries?",
    "answer": "<p>If in FG Purchase material used is of company then we need to issue material to manufacturer through issue material <strong>(SalesCRM > Manufacturer Management > Issue Material / Job Wise Issue Material).</strong></p><p>Such diamonds manufacturer wise will show in FG Purchase I button as shown below</p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/40.png\" alt=\"Diamond issue interface\" /><p>Here you will be able to use remaining diamonds as Total Issued – FG Studded – Repairing Studded – Return Material.</p><p>You can issue job wise diamond to FG Purchase too if collection, category, manufacturer matches with job wise issued diamonds.</p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/41.png\" alt=\"Job wise diamond issue\" /><p><strong>Special Notes:</strong> If you have added diamonds and colorstone manually then it will not get any effect in diamond info report.</p>",
    "tags": ["FG purchase", "diamond", "color stone", "issue material", "manufacturer"]
  },
  {
    "id": 44,
    "category": "FG Purchase",
    "question": "When you can edit job in FG Purchase?",
    "answer": "<p>You can edit job in FG Purchase at any time condition that job should be On Hand Stock.</p>",
    "tags": ["FG purchase", "edit job", "on hand stock", "conditions"]
  },
  {
    "id": 45,
    "category": "FG Purchase",
    "question": "How to issue Mount in FG Purchase?",
    "answer": "<p>You can issue Mount through FG Purchase in two ways:</p><ol><li>Issue mount to manufacturer and then stud it in FG Purchase</li><li>Issue mount directly from Stock</li><li>If mount is of manufacturer</li></ol><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/42.png\" alt=\"Mount issue to manufacturer\" /><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/43.png\" alt=\"Mount issue from stock\" /><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/44.png\" alt=\"Manufacturer mount\" />",
    "tags": ["FG purchase", "mount", "issue", "manufacturer", "stock"]
  },
  {
    "id": 46,
    "category": "FG Purchase",
    "question": "How you can add Sales Wastage while FG Purchase?",
    "answer": "<p>It will come while adding new Job in FG Purchase</p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/45.png\" alt=\"Sales wastage in FG Purchase\" />",
    "tags": ["FG purchase", "sales wastage", "new job", "wastage"]
  },
  {
    "id": 47,
    "category": "FG Purchase",
    "question": "How to add opening entries in FG Purchase?",
    "answer": "<p>You can add opening entries in FG purchase by purchasing it from default customer as shown below.</p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/46.png\" alt=\"Opening entries setup\" />",
    "tags": ["FG purchase", "opening entries", "default customer", "setup"]
  },
  {
    "id": 48,
    "category": "Design Management",
    "question": "How auto design number system works while creating new design?",
    "answer": "<p>Auto design works along with combination of collection and category with prefix set in it. You can set it from <strong>Masters and Policy > PD > Mapping.</strong></p><img src=\"https://cdn22.optigoapps.com/lib/jo/28/Help/FAQ%20images/47.png\" alt=\"Auto design number system\" /><p>It will work on total count purchased +1.</p><p>For adding postfix you need to add prefix+ \"++\" + postfix. Say for example if I have set it as NCK++E then design number will be generated as nck1e, nck2e, etc..</p>",
    "tags": ["design management", "auto design", "numbering", "collection", "category", "prefix", "postfix"]
  }
];
export const Category = Object.groupBy(FaqList, item => item.category)

export const CategoryWiseHelp = Object.keys(Category);
