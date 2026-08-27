// Kuweka tarehe ya leo kama default kwenye input, lakini mtumiaji anaweza kuibadilisha
    document.getElementById('inputDate').value = new Date().toISOString().slice(0, 10);
    document.getElementById('inputStampDate').value = new Date().toISOString().slice(0, 10);

    // Kubadilisha tarehe iliyochaguliwa (YYYY-MM-DD) kuwa muonekano rahisi kusomeka (DD/MM/YYYY)
    function formatDateForDisplay(isoDate) {
        if (!isoDate) return "";
        let parts = isoDate.split("-");
        return parts[2] + "/" + parts[1] + "/" + parts[0];
    }

    // Chaguo za awamu kulingana na aina ya huduma:
    // Website/App = malipo kwa awamu (1a 20% + 1b 20% + Awamu 2 30% + Awamu 3 30% = 100%)
    // IT Support / Graphics = malipo kamili (100%) baada ya kazi kukamilika
    const milestoneOptionsByService = {
        WEBAPP: [
            { value: "Awamu ya 1a: Malipo ya Awali (Kianzio - 20%)", text: "Awamu ya 1a: Kianzio (20%)" },
            { value: "Awamu ya 1b: Kukamilisha Kianzio (20%)", text: "Awamu ya 1b: Kianzio (20%)" },
            { value: "Awamu ya 2: Maendeleo na Vipengele Vikuu (30%)", text: "Awamu ya 2: Maendeleo (30%)" },
            { value: "Awamu ya 3: Ukamilishaji na Kukabidhi (30%)", text: "Awamu ya 3: Kukabidhi (30%)" },
            { value: "Malipo Kamili ya Mradi", text: "Malipo Kamili (100%)" }
        ],
        ITSUPPORT: [
            { value: "Malipo Kamili ya Mradi", text: "Malipo Kamili (100%) - Baada ya Kazi Kukamilika" }
        ]
    };

    // Kujaza upya chaguo za awamu kulingana na aina ya huduma iliyochaguliwa
    function toggleServiceType() {
        let serviceType = document.getElementById('inputServiceType').value;
        let milestoneSelect = document.getElementById('inputMilestone');
        let options = milestoneOptionsByService[serviceType];

        milestoneSelect.innerHTML = "";
        options.forEach(function (opt) {
            let optionEl = document.createElement('option');
            optionEl.value = opt.value;
            optionEl.text = opt.text;
            milestoneSelect.appendChild(optionEl);
        });

        autoFillMilestone();
    }

    // Kuweka mpangilio sahihi wa awali (rangi ya mstari, namba, awamu) mara tu ukurasa unapofunguka
    window.addEventListener('DOMContentLoaded', function () {
        toggleServiceType();
        toggleDocumentType();
    });

    // Kubadilisha muonekano kati ya Invoice na Receipt
    function toggleDocumentType() {
        let type = document.getElementById('inputType').value;
        let receiptFields = document.getElementById('receiptFields');
        let invoiceInstr = document.getElementById('invoicePaymentInstructions');
        let receiptDetails = document.getElementById('receiptPaymentDetails');
        let stampArea = document.getElementById('stampAreaContainer');
        let labelAmountText = document.getElementById('labelAmountText');
        let labelSummaryPaidText = document.getElementById('labelSummaryPaidText');
        let labelBalanceText = document.getElementById('labelBalanceText');
        let previewRow = document.getElementById('previewRow');
        let noPrefixHint = document.getElementById('noPrefixHint');

        document.getElementById('previewType').innerText = type;

        if (type.includes("RECEIPT")) {
            receiptFields.style.display = "block";
            invoiceInstr.style.display = "none";
            receiptDetails.style.display = "block";
            stampArea.style.display = "block"; // Inaonekana kwenye receipt
            labelAmountText.innerText = "Kiasi Kilicholipwa (TZS):";
            labelSummaryPaidText.innerText = "Kiasi Kilicholipwa:";
            labelBalanceText.innerText = "Kiasi kilichobaki:";
            previewRow.classList.remove("row-unpaid");
            previewRow.classList.add("row-paid");
            noPrefixHint.innerText = "Namba kamili: DT-REC-" + document.getElementById('inputNo').value;
        } else {
            receiptFields.style.display = "none";
            invoiceInstr.style.display = "block";
            receiptDetails.style.display = "none";
            stampArea.style.display = "none"; // Haionekani kwenye invoice
            labelAmountText.innerText = "Kiasi Kinacholipwa (TZS):";
            labelSummaryPaidText.innerText = "Kiasi Kinacholipwa:";
            labelBalanceText.innerText = "Kiasi kinachobaki:";
            previewRow.classList.remove("row-paid");
            previewRow.classList.add("row-unpaid");
            noPrefixHint.innerText = "Namba kamili: DT-INV-" + document.getElementById('inputNo').value;
        }
        updateDocument();
    }

    // Kazi ya kusasisha hati moja kwa moja kulingana na fomu
    function updateDocument() {
        let type = document.getElementById('inputType').value;
        let noValue = document.getElementById('inputNo').value;
        let prefix = type.includes("RECEIPT") ? "DT-REC-" : "DT-INV-";

        document.getElementById('previewNo').innerText = prefix + noValue;
        document.getElementById('noPrefixHint').innerText = "Namba kamili: " + prefix + noValue;
        document.getElementById('currentDate').innerText = formatDateForDisplay(document.getElementById('inputDate').value);
        document.getElementById('stampDateLabel').innerText = "Tarehe ya Malipo: " + formatDateForDisplay(document.getElementById('inputStampDate').value);
        document.getElementById('previewClient').innerText = document.getElementById('inputClient').value;
        document.getElementById('previewProject').innerText = document.getElementById('inputProject').value;
        document.getElementById('previewDesc').innerText = document.getElementById('inputDesc').value;
        document.getElementById('previewTin').innerText = document.getElementById('inputTin').value;

        let milestoneSelect = document.getElementById('inputMilestone');
        document.getElementById('previewMilestone').innerText = milestoneSelect.options[milestoneSelect.selectedIndex].text;

        let total = document.getElementById('inputTotalProject').value;
        let paid = document.getElementById('inputAmountPaid').value;

        document.getElementById('previewAmountPaid').innerText = "TZS " + paid;
        document.getElementById('previewTotal').innerText = "TZS " + total;
        document.getElementById('previewPaidNow').innerText = "TZS " + paid;

        // Taarifa za Receipt
        document.getElementById('previewMethodUsed').innerText = document.getElementById('inputPaymentMethod').value;
        document.getElementById('previewDisplayTxId').innerText = document.getElementById('inputTxId').value;

        // Kokotoa salio kiotomatiki
        let totalNum = parseFloat(total.replace(/,/g, '')) || 0;
        let paidNum = parseFloat(paid.replace(/,/g, '')) || 0;
        let balanceNum = totalNum - paidNum;
        document.getElementById('previewBalance').innerText = "TZS " + balanceNum.toLocaleString();
    }

    // Kazi ya kujaza maelezo kiotomatiki ukichagua awamu
    function autoFillMilestone() {
        let milestone = document.getElementById('inputMilestone').value;
        let descField = document.getElementById('inputDesc');
        let amountField = document.getElementById('inputAmountPaid');

        if(milestone.includes("Awamu ya 1a")) {
            descField.value = "Awamu ya 1a: Kianzio (20%) - Kuanzisha mradi rasmi, Mkataba na Makubaliano ya Awali";
            amountField.value = "300,000";
        } else if(milestone.includes("Awamu ya 1b")) {
            descField.value = "Awamu ya 1b: Kianzio (20%) - Usanifu wa mfumo (Database & Architecture), UI/UX Design ya Website (Responsive)";
            amountField.value = "300,000";
        } else if(milestone.includes("Awamu ya 2")) {
            descField.value = "Awamu ya 2: Maendeleo - Kuweka Listings, Search/Filters, Deal Room & Negotiation History, Commission Engine (5%)";
            amountField.value = "450,000";
        } else if(milestone.includes("Awamu ya 3")) {
            descField.value = "Awamu ya 3: Kukabidhi - Admin Dashboard, Dispute Management, majaribio, Live Deployment na Mafunzo";
            amountField.value = "450,000";
        } else {
            let serviceType = document.getElementById('inputServiceType').value;
            if (serviceType === "ITSUPPORT") {
                descField.value = "Huduma ya IT Support / Graphics Design - Malipo Kamili (100%) Baada ya Kazi Kukamilika";
            } else {
                descField.value = "Malipo Kamili ya Mradi (100%)";
            }
            amountField.value = document.getElementById('inputTotalProject').value;
        }
        updateDocument();
    }

    // Kazi ya kupakia picha ya muhuri (uliyoubuni mwenyewe) na kuionyesha kwenye risiti
    function handleStampImageUpload(event) {
        let file = event.target.files[0];
        let img = document.getElementById('stampImagePreview');

        if (!file) {
            img.style.display = "none";
            img.src = "";
            return;
        }

        let reader = new FileReader();
        reader.onload = function (e) {
            img.src = e.target.result;
            img.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
