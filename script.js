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

    // Kubadilisha muonekano kati ya Invoice, Receipt, SLA, na Proposal
    function toggleDocumentType() {
        let type = document.getElementById('inputType').value;
        let receiptFields = document.getElementById('receiptFields');
        let slaFields = document.getElementById('slaFields');
        let proposalFields = document.getElementById('proposalFields');
        let invoiceReceiptContent = document.getElementById('invoiceReceiptContent');
        let slaContent = document.getElementById('slaContent');
        let proposalContent = document.getElementById('proposalContent');
        let invoiceInstr = document.getElementById('invoicePaymentInstructions');
        let receiptDetails = document.getElementById('receiptPaymentDetails');
        let stampArea = document.getElementById('stampAreaContainer');
        let labelAmountText = document.getElementById('labelAmountText');
        let labelSummaryPaidText = document.getElementById('labelSummaryPaidText');
        let labelCumulativePaidText = document.getElementById('labelCumulativePaidText');
        let labelBalanceText = document.getElementById('labelBalanceText');
        let previewRow = document.getElementById('previewRow');
        let noPrefixHint = document.getElementById('noPrefixHint');

        // Ficha kila kitu maalum kwanza, kisha onyesha kinachohusika na aina iliyochaguliwa
        receiptFields.style.display = "none";
        slaFields.style.display = "none";
        proposalFields.style.display = "none";
        invoiceReceiptContent.style.display = "none";
        slaContent.style.display = "none";
        proposalContent.style.display = "none";
        stampArea.style.display = "none";

        if (type === "SLA") {
            slaFields.style.display = "block";
            slaContent.style.display = "block";
            document.getElementById('previewType').innerText = document.getElementById('inputSlaTitle').value;
            noPrefixHint.innerText = "Namba kamili: DT-SLA-" + document.getElementById('inputNo').value;
        } else if (type === "PROPOSAL") {
            proposalFields.style.display = "block";
            proposalContent.style.display = "block";
            document.getElementById('previewType').innerText = "PROPOSAL YA MRADI";
            noPrefixHint.innerText = "Namba kamili: DT-PROP-" + document.getElementById('inputNo').value;
        } else {
            invoiceReceiptContent.style.display = "block";
            document.getElementById('previewType').innerText = type;

            if (type.includes("RECEIPT")) {
                receiptFields.style.display = "block";
                invoiceInstr.style.display = "none";
                receiptDetails.style.display = "block";
                stampArea.style.display = "block"; // Inaonekana kwenye receipt
                labelAmountText.innerText = "Kiasi Kilicholipwa (TZS):";
                labelSummaryPaidText.innerText = "Jumla ya kiasi kilicholipwa sasa:";
                labelCumulativePaidText.innerText = "Jumla kamili ya kiasi kilicholipwa:";
                labelBalanceText.innerText = "Jumla ya kiasi kilichobakia:";
                previewRow.classList.remove("row-unpaid");
                previewRow.classList.add("row-paid");
                noPrefixHint.innerText = "Namba kamili: DT-REC-" + document.getElementById('inputNo').value;
            } else {
                invoiceInstr.style.display = "block";
                receiptDetails.style.display = "none";
                labelAmountText.innerText = "Kiasi Kinacholipwa (TZS):";
                labelSummaryPaidText.innerText = "Jumla ya Kiasi kinacholipwa sasa:";
                labelCumulativePaidText.innerText = "Jumla ya Kiasi kitakachokuwa kimelipwa:";
                labelBalanceText.innerText = "Jumla ya Kiasi kinachobakia:";
                previewRow.classList.remove("row-paid");
                previewRow.classList.add("row-unpaid");
                noPrefixHint.innerText = "Namba kamili: DT-INV-" + document.getElementById('inputNo').value;
            }
        }
        updateDocument();
    }

    // Kazi ya kusasisha hati moja kwa moja kulingana na fomu
    function updateDocument() {
        let type = document.getElementById('inputType').value;
        let noValue = document.getElementById('inputNo').value;
        let prefix = "DT-INV-";
        if (type === "SLA") prefix = "DT-SLA-";
        else if (type === "PROPOSAL") prefix = "DT-PROP-";
        else if (type.includes("RECEIPT")) prefix = "DT-REC-";

        document.getElementById('previewNo').innerText = prefix + noValue;
        document.getElementById('noPrefixHint').innerText = "Namba kamili: " + prefix + noValue;
        if (type === "SLA") {
            document.getElementById('previewType').innerText = document.getElementById('inputSlaTitle').value;
        } else if (type === "PROPOSAL") {
            document.getElementById('previewType').innerText = "PROPOSAL YA MRADI";
        }
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
        let previousPaid = document.getElementById('inputPreviousPaid').value;

        document.getElementById('previewAmountPaid').innerText = "TZS " + paid;
        document.getElementById('previewTotal').innerText = "TZS " + total;
        document.getElementById('previewPaidNow').innerText = "TZS " + paid;

        // Taarifa za Receipt
        document.getElementById('previewMethodUsed').innerText = document.getElementById('inputPaymentMethod').value;
        document.getElementById('previewDisplayTxId').innerText = document.getElementById('inputTxId').value;

        // Kokotoa jumla ya malipo hadi sasa (malipo ya awali + haya ya sasa) na salio kiotomatiki
        let totalNum = parseFloat(total.replace(/,/g, '')) || 0;
        let paidNum = parseFloat(paid.replace(/,/g, '')) || 0;
        let previousPaidNum = parseFloat(previousPaid.replace(/,/g, '')) || 0;
        let cumulativePaidNum = previousPaidNum + paidNum;
        let balanceNum = totalNum - cumulativePaidNum;
        document.getElementById('previewCumulativePaid').innerText = "TZS " + cumulativePaidNum.toLocaleString();
        let balanceText = "TZS " + balanceNum.toLocaleString();
        document.getElementById('previewBalance').innerText = balanceText;

        // Taarifa za SLA (Makubaliano ya Huduma) - zinasasishwa kila wakati, zinaonekana tu ukichagua SLA
        document.getElementById('previewSlaClient').innerText = document.getElementById('inputClient').value;
        document.getElementById('previewSlaClient2').innerText = document.getElementById('inputClient').value;
        document.getElementById('previewSlaGoal').innerText = document.getElementById('inputSlaGoal').value;

        let invoiceRefNo = "DT-INV-" + noValue;
        document.getElementById('previewSlaScopeWork').innerText = document.getElementById('inputSlaScopeWork').value + " " + invoiceRefNo + ".";
        document.getElementById('previewSlaRevisions').innerText = document.getElementById('inputSlaRevisions').value;
        document.getElementById('previewSlaTimeline').innerText = document.getElementById('inputSlaTimeline').value;

        document.getElementById('previewSlaTotal').innerText = "TZS " + total;
        document.getElementById('previewSlaMilestoneLabel').innerText = milestoneSelect.options[milestoneSelect.selectedIndex].text + " - Imelipwa";
        document.getElementById('previewSlaPaid').innerText = "TZS " + paid;
        document.getElementById('previewSlaBalance').innerText = balanceText;

        let docDate = formatDateForDisplay(document.getElementById('inputDate').value);
        document.getElementById('previewSlaDate1').innerText = docDate;
        document.getElementById('previewSlaDate2').innerText = docDate;

        // Taarifa za Proposal (Pendekezo la Mradi) - zinasasishwa kila wakati, zinaonekana tu ukichagua Proposal
        document.getElementById('previewPropTagline').innerText = document.getElementById('inputPropTagline').value;
        document.getElementById('previewPropIntro').innerText = document.getElementById('inputPropIntro').value;
        renderBoldList('previewPropScope', document.getElementById('inputPropScope').value);
        renderBoldList('previewPropTechnical', document.getElementById('inputPropTechnical').value);
        renderBoldList('previewPropPillars', document.getElementById('inputPropPillars').value);
        renderBoldList('previewPropRevenue', document.getElementById('inputPropRevenue').value);
        renderBoldList('previewPropStack', document.getElementById('inputPropStack').value);
        renderTimeline('previewPropTimeline', document.getElementById('inputPropTimeline').value);
        document.getElementById('previewPropTotalTime').innerText = "Jumla ya muda: " + document.getElementById('inputPropTotalTime').value;
        renderBoldList('previewPropOffers', document.getElementById('inputPropOffers').value);
        document.getElementById('previewPropCost').innerText = "TZS " + total;
        document.getElementById('previewPropPay1Pct').innerText = document.getElementById('inputPropPay1Pct').value;
        document.getElementById('previewPropPay1Desc').innerText = document.getElementById('inputPropPay1Desc').value;
        document.getElementById('previewPropPay2Pct').innerText = document.getElementById('inputPropPay2Pct').value;
        document.getElementById('previewPropPay2Desc').innerText = document.getElementById('inputPropPay2Desc').value;
        document.getElementById('previewPropPay3Pct').innerText = document.getElementById('inputPropPay3Pct').value;
        document.getElementById('previewPropPay3Desc').innerText = document.getElementById('inputPropPay3Desc').value;
        document.getElementById('previewPropClosing').innerText = document.getElementById('inputPropClosing').value;
        document.getElementById('previewPropSigner').innerText = document.getElementById('inputPropSigner').value;
    }

    // Kubadilisha mstari wenye muundo "Kichwa: Maelezo" kuwa orodha yenye kichwa kilichokolezwa (bold)
    function renderBoldList(targetId, text) {
        let el = document.getElementById(targetId);
        el.innerHTML = "";
        text.split('\n').map(function (l) { return l.trim(); }).filter(Boolean).forEach(function (line) {
            let idx = line.indexOf(':');
            let li = document.createElement('li');
            if (idx > -1) {
                let head = line.slice(0, idx).trim();
                let rest = line.slice(idx + 1).trim();
                let b = document.createElement('b');
                b.textContent = head + ":";
                li.appendChild(b);
                li.appendChild(document.createTextNode(" " + rest));
            } else {
                li.textContent = line;
            }
            el.appendChild(li);
        });
    }

    // Kubadilisha mstari wenye muundo "Awamu | Muda" kuwa safu za ratiba
    function renderTimeline(targetId, text) {
        let el = document.getElementById(targetId);
        el.innerHTML = "";
        text.split('\n').map(function (l) { return l.trim(); }).filter(Boolean).forEach(function (line) {
            let parts = line.split('|');
            let phase = (parts[0] || '').trim();
            let wk = (parts[1] || '').trim();
            let row = document.createElement('div');
            row.className = "prop-timeline-row";
            row.innerHTML = '<span class="prop-timeline-phase"></span><span class="prop-timeline-wk"></span>';
            row.querySelector('.prop-timeline-phase').textContent = phase;
            row.querySelector('.prop-timeline-wk').textContent = wk;
            el.appendChild(row);
        });
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
            img.src = "images/payment-stamp.png"; // Rudi kwenye muhuri wa chaguo-msingi
            return;
        }

        let reader = new FileReader();
        reader.onload = function (e) {
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    // Kazi ya kupakia muhuri wa idhini (SLA) uliobadilishwa na mtumiaji
    function handleSlaStampUpload(event) {
        let file = event.target.files[0];
        let img = document.getElementById('slaStampPreview');

        if (!file) {
            img.src = "images/sla-approved-stamp.png"; // Rudi kwenye muhuri wa chaguo-msingi
            return;
        }

        let reader = new FileReader();
        reader.onload = function (e) {
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
