# Partner staff contacts — person and interaction changes

| Field | Value |
|---|---|
| Status | in-progress |
| Started | 2026-10-01 |
| Shipped | |
| SRS row | — |
| Test cases | TC-PCI-01..24 |
| Prototype todo | — |

## 1. Requirement (as given)

A batch of **small changes to the partner staff Contacts module** (Persons and
Interactions, under `partner.niwasi.in/{slug}/staff/contacts/...`), given one at a time. Each
change is quoted verbatim below, as it arrives.

### Change 1: move Identification Details to section 2 (person form)

> at this page http://partner.niwasi.abhishek/Sunai/staff/contacts/persons/new
> Bring 'IDentification Details at sr no 2 after sr no 1"

(user, 2026-10-01, with a screenshot of the person form's collapsed sections 2–6.)

### Change 2: "Company (if any)" field in the interaction form's Person Details

> in this page
> http://partner.niwasi.abhishek/Sunai/staff/contacts/interaction/new
> in the personal details section we need to add a new field
> company if any
> it is not required and max char 100 (we will be adding a new column for it right so keep it varchar(150) add application level 100 char validation )

(user, 2026-10-01, with a screenshot of the Person Details panel: First Name*, Designation, Other
Mobile No., then the "Basic Details" fields.)

### Change 3: rename the Find Person "+ Add" button to "+ Add or Search"

> we have this add button we rename it to "+Add or Search"
> in both person and interaction page

(user, 2026-10-01, with a screenshot of "Create person" → Find Person: Phone Number 9999999999,
Status "+ Add".)

### Change 4: add services to "Services Sunai Can Offer" (interaction form)

> can you check where are the options coming from in this drop down
> Services Sunai Can Offer
> in this page
> http://partner.niwasi.abhishek/Sunai/staff/contacts/interaction/new
> are they static or comming from any master table

(answered: static, see §2) then:

> ok then we need to add new services there
>
> Mitram Kitchen - Rasoi
> Catering
> Tiffin Services
> Laddu Sales
> Ham Niwasi
> Survey
> Campaign and database
> Generic Medicine Zeelabs

(user, 2026-10-01, with a screenshot of the open dropdown.)

### Change 5: two new Residence options (Hindi)

> can you check the same for the Residence dropdown if the options are static or not
> in this page
> http://partner.niwasi.abhishek/Sunai/staff/contacts/interaction/new

> which table does residents data goes to ?

> and which column

(answered: static; stored as a number code in `staff_contact_persons.residence`, see §2) then:

> so i want to 2 new options in that dropdown
> translate them in hindi
> Other part of Patna
> Other part of Bihar

(user, 2026-10-01)

### Change 6: a follow-up field for the two new Residence options

> ok for that same dropdown residence
> when a user selects other parts of patna or the other parts of bihar options
> then a new field should appear and the title will be the selected option

(user, 2026-10-01)

## 2. Plan

There is no earlier planning file for the Contacts module; `grep docs/planning/features/`
found none. Each change is UI-level unless noted. The page maps and API docs are only touched if
a change adds, removes or moves a page or endpoint.

### Change 1: Identification Details → section 2

- **File:** `apps/frontend/components/partner/contacts/PersonForm.tsx`. The `steps` array that
  feeds `AccordionWizard`: the "Identification Details" step moves from 4th to 2nd.
- **New order:**
  1. Basic Details
  2. **Identification Details**
  3. Additional Personal Details
  4. Address Details
  5. Education & Professional Details
  6. Additional Information
- **Numbering:** the section numbers come from each step's position in the array, so they
  renumber automatically.
- **Order-dependent code:** `validateStep(index)` only checks index 0 (Basic Details: First
  Name, DOB), which is still first. Nothing else depends on step position. The "Section 5"
  (Organisation) and "Section 6" (Referral) code comments are still correct.
- **Scope:** the same form drives **new** (`/staff/contacts/persons/new`) and **edit**
  (`/staff/contacts/persons/[id]/edit`), so both get the new order. No API, field or validation
  change.
- **Translation:** the labels are unchanged (they already go through the shared field
  components).

### Change 2: "Company (if any)" in Person Details (interaction form)

**What exists today** (`components/partner/contacts/InteractionForm.tsx`, the "Person Details"
panel, top row):
- **First Name** and **Designation** are saved **on the person**, `staff_contact_persons`
  (`first_name`, `org_designation`). They're pre-filled from the person and synced back on save.
- **Other Mobile No.** is saved **on the interaction**, `staff_contact_interactions.mobile_no`.
  It's a fresh value for each interaction and is never pre-filled.
- The person's organisation is a separate panel (Organisation Details, `org_id` /
  `organization_name`). "Company (if any)" is a free-text value next to it, not a link to an
  organisation record.

So the new field can belong to **the person** (like Designation) or to **this interaction**
(like Other Mobile No.). That decides the table and the behaviour (Q1).

~~**Plan** (assuming Q1 = person, the recommendation)~~ **Superseded:** the user chose
**interaction only** (Q1). The person-based plan (a column on `staff_contact_persons`, a person
sync, the Person form / view) is dropped.

**Plan (as decided 2026-10-01: Q1 interaction only, Q2 as recommended, Q3 no):**
- **DB:** one new nullable column, `company_name VARCHAR(150) NULL`, on
  **`staff_contact_interactions`** (`AFTER designation`).
  - It holds the interaction's own value, not a reference, so the `{table}_id` naming rule
    doesn't apply.
  - It's added with a dated `.sql`: `apps/api/prisma/sql/2026-10-01-staff-contact-interaction-company.sql`,
    run by the user, plus the Prisma model.
- **Validation** (user): optional; trimmed; **max 100 characters at application level**, while
  the column stays VARCHAR(150); blank → NULL.
  - API: the interaction body (`staff-contact.schema.ts`) gets `company_name: optStr(100)`, with
    blank → null.
  - Form: the input has `maxLength` 100 and a live `n/100` counter.
- **API:** `interactionWritable` writes `company_name`, and the interaction serializer returns it.
  It's not copied to or from the person.
- **Interaction form** (`InteractionForm.tsx`, Person Details):
  - **"Company (if any)"** is the **4th field in the top row**, after Other Mobile No. (Q2); the
    row becomes 4 columns on large screens.
  - It behaves **like Other Mobile No.**: a fresh value on each new interaction, never pre-filled
    from the person or a previous interaction, and locked until "Edit" for an existing person.
  - When **editing an existing interaction**, it shows that interaction's own saved value.
  - It's sent with the interaction body (the `optionalKeys` list).
- **Interaction view page** (`InteractionFields.tsx`): shows "Company (if any)" next to Other
  Mobile No. This is the interaction's own record. It's **not** added to the Person form or view
  (Q3: no).
- **Translation:** the label goes through `t()`. No label SQL.
- **Docs:** `api-structure.md` gets a note that the staff interaction body has `company_name`. No
  new page or endpoint.

**Open questions** (answered 2026-10-01; see §4):
1. **Where does Company belong?** Recommendation: **on the person** (`staff_contact_persons`),
   like Designation. It's pre-filled next time and shows on the person's page. The alternative is
   **on this interaction only** (`staff_contact_interactions`), like Other Mobile No., which is
   entered fresh each interaction and never pre-filled.
2. **Position.** Recommendation: the 4th field in the top row (First Name, Designation, Other
   Mobile No., **Company (if any)**), with the row widened to 4 columns on large screens.
3. **Show it on the Person form and view page too?** Recommendation: **yes**, as Basic Details
   → "Company (if any)" on create/edit, and a row on the person view. Otherwise the value is only
   visible inside the interaction form.

### Change 3: "+ Add" → "+ Add or Search" (Find Person step)

- **Where:** the Find Person step's Status button, shown once a 10-digit mobile that matches no
  person is entered:
  - **person** page: `components/partner/contacts/PersonForm.tsx`, used by
    `/staff/contacts/persons/new`;
  - **interaction** page: `app/(partner)/partner/(dash)/[slug]/staff/contacts/interaction/new/page.tsx`.
- **Change:** the button text goes from `t("Add")` to `t("Add or Search")`. The "+" is the
  existing `add` icon in front of the text, so the button reads **"+ Add or Search"**. Its click
  behaviour is unchanged (it starts the new-person form).
- **Not changed:**
  - the Organisation form's identical Find Organisation "+ Add" (the user named person and
    interaction only);
  - the other "Add" buttons (Label manager, Search-combo quick-add).
- **Translation:** the new string goes through `t()`; the team adds the Hindi in the Language
  admin.

### Change 4: new options in "Services Sunai Can Offer"

- **What exists today:** the dropdown's options are **static**, the `SERVICE_OPTIONS` constant
  in `apps/frontend/components/partner/contacts/interactionQuestions.ts`. They were copied from
  the prototype's `<select>`.
  - Current list: Waste Management, Home Tuition, Mitram Store, Community Programme, Training /
    Workshop, Other.
  - The chosen **text** is saved into `staff_contact_interactions.services_sunai_can_offer`
    (VARCHAR(255)). The API accepts any text up to 255 characters, and there is no master table.
  - The prototype has a "Services Sunai Can Offer" admin master (`service-master.html`), but it
    isn't built; that was offered, not requested.
- **Change:** add the user's 8 services to `SERVICE_OPTIONS`, exactly as written and in the given
  order:
  - Mitram Kitchen - Rasoi
  - Catering
  - Tiffin Services
  - Laddu Sales
  - Ham Niwasi
  - Survey
  - Campaign and database
  - Generic Medicine Zeelabs

  They go after the existing five, and **"Other" stays last**. The value equals the label, as for
  the others.
- **No DB / API change:** the column already stores free text, and the longest new value is 24
  characters. Existing saved interactions keep their values.
- **Translation:** the dropdown labels already go through `SelectField`'s `t()` like the
  existing ones. The saved value stays the English text.

### Change 5: Residence — "Other part of Patna" / "Other part of Bihar"

- **What exists today:**
  - The options are **static**, the `RESIDENCE` constant in
    `components/partner/contacts/PersonForm.tsx`, which `InteractionForm.tsx` also imports. The
    labels are the prototype's Hindi text and are shown as-is (data, not translated through
    `t()`).
  - The saved value is a **number code**:

    | Code | Label |
    |---|---|
    | 1 | उजियार, बलिया |
    | 2 | सजना, गाजीपुर |
    | 3 | मंगला भवानी, बलिया के आसपास |
    | 4 | दानापुर |
    | 5 | पटना बाज़ार समिति |
    | 6 | पटना वार्ड 44 के आस पास |
    | 7 | पटना वार्ड 4 के आस पास |
    | 8 | बक्सर |
    | 9 | अन्य |
    | 10 | नहीं मालुम |

  - It's stored in **`staff_contact_persons.residence`** (INT, nullable). The interaction form
    saves it to the **person** (the `PERSON_EXTRA_KEYS` sync); `staff_contact_interactions` has
    no residence column. The API accepts any integer (`optInt`).
  - Local data uses codes 1, 4, 5, 6 and 9.
- **Change:** two new options, translated into Hindi as the user asked, **with new codes**. The
  existing codes are never renumbered, because saved people point at them.

  | Code | Label (Hindi) | English |
  |---|---|---|
  | 11 | **पटना के अन्य भाग** | Other part of Patna |
  | 12 | **बिहार के अन्य भाग** | Other part of Bihar |

- **Display order:** codes 1–8, then **11, 12**, then **अन्य (9)** and **नहीं मालुम (10)**,
  which stay last. A plain object would sort the numeric keys (11 and 12 after 10), so a new
  ordered `RESIDENCE_OPTIONS` array (`{ value, label }[]`, the array form `SelectField` already
  supports) feeds both dropdowns. `RESIDENCE` stays as the code → label map.
- **Where:** the person Create/Edit form (Address Details) and the interaction form (Person
  Details → Profession & Employment), since both use the same list.
- **No DB / API change:** the column is INT and the API accepts any integer. People saved
  earlier keep their codes and labels.

### Change 6: extra field when Residence = "पटना के अन्य भाग" / "बिहार के अन्य भाग"

- **Behaviour:** when Residence is **11 (पटना के अन्य भाग)** or **12 (बिहार के अन्य भाग)**, a new
  text field appears right after the Residence dropdown. **Its label is the selected option's
  text**, so it reads "पटना के अन्य भाग" or "बिहार के अन्य भाग". For any other option the field
  is hidden. It's meant for where exactly, e.g. the locality name.
- **Storage:** the **existing, unused** column `staff_contact_persons.other_residence`
  (VARCHAR(255), nullable).
  - It's already in the API: the person body (`optStr(255)`), the write list and the
    serializer.
  - No form uses it today, and no local row has a value.
  - **No DB migration is needed.**
- **Where:**
  - the person Create/Edit form (Address Details → Residence);
  - the interaction form (Person Details → Profession & Employment → Residence). It's saved
    with the person, like Residence itself: added to the interaction form's `PERSON_EXTRA_KEYS`
    sync and to PersonForm's field list.
- **Changing Residence:** switching to an option without the field clears the text, and the save
  sends `other_residence = null`, so a hidden stale value isn't kept (Q2).
- **Validation (Q1, decided 2026-10-01: "100 char and required when field appears"):**
  - **Required whenever the field is shown** (Residence = 11 / 12). Trimmed; max **100**
    characters at application level, with a live `n/100` counter. The column stays VARCHAR(255).
  - The recommendation had been "optional"; the user chose required. Built as asked.
  - **API:** `PersonBody.other_residence` becomes `optStr(100)`, plus a refinement: when
    `residence` is 11 or 12, a missing or blank `other_residence` → 422 on `other_residence`.
  - **Server-side clear:** the person write stores `other_residence = null` whenever `residence`
    isn't 11 / 12, so a stale value can't be kept even if a client sends one.
  - **Forms:** the same rule, inline under the field. Save is blocked until it's filled.
- **Translation:** the label is the option's own Hindi text (data), so it's not passed through
  `t()`.

**Open questions** (answered 2026-10-01; see §4):
1. **Required and length?** Recommendation: **optional**, max **100** characters. The
   alternative is required whenever the field is shown.
2. **Clear on change?** Recommendation: **yes**. Picking a different Residence clears the extra
   text, so a hidden old value isn't saved.
3. **Also for "अन्य" (9)?** Recommendation: **no**, only the two new options, as asked.

### All six changes are planned

## 3. Test cases

| TC-ID | Title | Pre-condition | Steps | Expected Result | Priority |
|---|---|---|---|---|---|
| TC-PCI-01 | Identification Details is section 2 (new) | Sunai staff | Open `/Sunai/staff/contacts/persons/new`, enter a new mobile to reach the form | Sections read 1 Basic Details, **2 Identification Details**, 3 Additional Personal Details, 4 Address Details, 5 Education & Professional Details, 6 Additional Information | H |
| TC-PCI-02 | Same order on edit | An existing person | Open its edit page | Same order as TC-PCI-01; saved Identification 1–4 values show in section 2 | M |
| TC-PCI-03 | Basic Details validation unaffected | New person form | Leave First Name empty and try to continue / save | "Name is required." still blocks, on section 1 | M |
| TC-PCI-04 | Identification values still save | New person form | Fill Identification 1–4 in section 2 → Save; reopen | The values are saved and shown | M |
| TC-PCI-05 | Company field shown | Sunai staff | Open `/Sunai/staff/contacts/interaction/new`, resolve a new mobile | Person Details shows "Company (if any)" (not required) as the 4th field in the top row, after Other Mobile No. | H |
| TC-PCI-06 | Company saved on the interaction | Same | Fill First Name + Company "Sunai Consultancy" → Save the interaction | `staff_contact_interactions.company_name` = "Sunai Consultancy"; the person record is unchanged (no company stored there) | H |
| TC-PCI-07 | Not pre-filled; edit keeps own value | Person whose previous interaction has a Company | Start a new interaction for that person; then edit the old interaction | The new interaction's Company starts empty; the old interaction's edit form and view page show its own saved Company | H |
| TC-PCI-08 | Max 100 at application level | Form / API | Type 120 characters; send 101 via the API | The input stops at 100 with a `n/100` counter; the API returns 422 on `company_name`; 100 saves | H |
| TC-PCI-09 | Optional / blank | Form | Leave empty, or only spaces → Save | Saves; stored NULL | M |
| TC-PCI-10 | Column is VARCHAR(150) | After the SQL | Inspect the table | `company_name varchar(150) NULL` on `staff_contact_interactions` | L |
| TC-PCI-11 | Interaction view shows it; person pages don't | — | Open the interaction's view page; open the person's view and edit pages | The interaction view shows "Company (if any)"; the person pages have no Company field (Q3) | M |
| TC-PCI-12 | Person page button text | Sunai staff | `/Sunai/staff/contacts/persons/new` → enter a 10-digit mobile that isn't in any list | The Status button reads "+ Add or Search"; clicking it opens the person form as before | H |
| TC-PCI-13 | Interaction page button text | Same | `/Sunai/staff/contacts/interaction/new` → enter a new 10-digit mobile | The Status button reads "+ Add or Search"; clicking it opens the new-person fields as before | H |
| TC-PCI-14 | Organisation form unchanged | — | Organisation create → Find Organisation | Its button still reads "+ Add" | L |
| TC-PCI-15 | New services listed | Sunai staff | `/Sunai/staff/contacts/interaction/new` → open "Services Sunai Can Offer" | The options are, in order: Waste Management, Home Tuition, Mitram Store, Community Programme, Training / Workshop, Mitram Kitchen - Rasoi, Catering, Tiffin Services, Laddu Sales, Ham Niwasi, Survey, Campaign and database, Generic Medicine Zeelabs, Other | H |
| TC-PCI-16 | New service saves and shows | Same | Pick "Generic Medicine Zeelabs" → Save; open the interaction's view and edit pages | Saved as that text; shown on the view; preselected on edit | H |
| TC-PCI-17 | Old values intact | An interaction saved earlier with e.g. "Home Tuition" | Open its edit page | Still preselected "Home Tuition" | M |
| TC-PCI-18 | New Residence options and order | Sunai staff | Open the Residence dropdown on the interaction form and on the person form | Options: उजियार, बलिया … बक्सर, **पटना के अन्य भाग**, **बिहार के अन्य भाग**, अन्य, नहीं मालुम | H |
| TC-PCI-19 | New option saves its code | Same | Pick "पटना के अन्य भाग" → Save (person form or a new person via interaction) | `staff_contact_persons.residence` = 11 ("बिहार के अन्य भाग" → 12); the edit form preselects it | H |
| TC-PCI-20 | Old codes intact | A person saved with residence 5 | Open their edit page | Still preselected "पटना बाज़ार समिति" | M |
| TC-PCI-21 | Field appears with the option as its title | Person form and interaction form | Choose "पटना के अन्य भाग", then "बिहार के अन्य भाग", then "बक्सर" | A text field appears titled "पटना के अन्य भाग", then retitled "बिहार के अन्य भाग"; hidden for बक्सर | H |
| TC-PCI-22 | Saved to other_residence | Same | Choose "पटना के अन्य भाग", type "कंकड़बाग" → Save | `residence` = 11, `other_residence` = "कंकड़बाग"; edit shows the field pre-filled | H |
| TC-PCI-23 | Cleared when switching away | A person with residence 11 + text | Edit → choose "दानापुर" → Save | `other_residence` = NULL | M |
| TC-PCI-24 | Required + max 100 | Form / API | With residence 11: leave the field blank → Save; type 120 characters; via the API send residence 12 with no / blank `other_residence`, and 101 characters | Blank → inline required error and the save is blocked; the input stops at 100 (`n/100`); API → 422 on `other_residence` for blank and for 101 characters | H |

## 4. Sign-off

- 2026-10-01: change 1 requested and made (a trivial reorder; no open questions).
- 2026-10-01: change 2 requested ("Company (if any)", optional, max 100 at application level,
  VARCHAR(150)). Planned **before any code**; Q1–Q3 are waiting for the user.
- 2026-10-01, user: "1: interaction only / 2nd as recommended / 3. no".
  - **Q1 reversed the recommendation** (it was "on the person"): Company is stored on
    `staff_contact_interactions` only, like Other Mobile No., and is never pre-filled.
  - **Q2:** the 4th field in the top row.
  - **Q3:** not on the Person form / view.
  - Built as asked. The interaction view page shows it, because it's the interaction's own
    field.
- 2026-10-01: change 3 requested (rename the Find Person "+ Add" to "+ Add or Search" on the
  person and interaction pages). Planned before code; no open questions. The Organisation form's
  similar button is left as is, since only person and interaction were named.
- 2026-10-01: change 4 requested. First the question (where do the "Services Sunai Can Offer"
  options come from?), answered as **static** (`SERVICE_OPTIONS`, no master table); then the 8
  new services. Planned before code; no open questions.
- 2026-10-01: change 5. First the questions (are the Residence options static? which table /
  column?), answered: static `RESIDENCE` constant; stored as an INT code in
  `staff_contact_persons.residence`. Then: two new options, translated into Hindi. Planned before
  code:
  - codes 11 / 12, labels पटना के अन्य भाग / बिहार के अन्य भाग;
  - shown before अन्य / नहीं मालुम;
  - no open questions.
- 2026-10-01: change 6 requested (a field titled with the selected option, for Residence 11 / 12).
  Planned before code. It reuses the unused `staff_contact_persons.other_residence`, so no
  migration is needed. Q1–Q3 are waiting for the user.
- 2026-10-01, user: "for 2 and 3rd as recommended and for the 1 100 char and required when field
  appears".
  - Q2: clear on change.
  - Q3: only options 11 / 12.
  - **Q1 differs from the recommendation** (which was optional): the field is required while
    shown, max 100. Built as asked.
- 2026-10-01: **process miss.** Change 1 was coded **before** this planning file existed, against
  the AGENTS.md rule that a planning file is written before any code, even for a small change.
  The file was created only when the user asked. It now covers change 1 retroactively; changes 2–4
  will be planned here before any code.

## 5. Execution log

- 2026-10-01: **change 1** made (uncommitted).
  - `PersonForm.tsx`: the Identification Details step moved after Basic Details; the header
    comment's section list updated.
  - eslint and `tsc` clean.
  - Not yet checked in the browser; TC-PCI-01..04 pending.

- 2026-10-01: **change 2** implemented (uncommitted), after the plan and answers above.
  - **DB:** `apps/api/prisma/sql/2026-10-01-staff-contact-interaction-company.sql`
    (`ALTER TABLE staff_contact_interactions ADD COLUMN company_name VARCHAR(150) NULL AFTER
    designation`) plus the Prisma field. Validate and generate passed. **Not yet run by the
    user.**
  - **API (`staff-contact.*`):**
    - the interaction body has `company_name` (trimmed, max 100, "Company must be at most 100
      characters.", blank → null);
    - `interactionWritable` writes it;
    - the serializer returns it;
    - nothing touches the person.
  - **Frontend:**
    - `InteractionForm.tsx`: Person Details top row is now 4 columns, with "Company (if any)"
      4th: `maxLength` 100, a live `n/100` counter, locked until Edit like the other fields;
      sent via `optionalKeys`; not pre-filled for a new interaction; the edit page loads the
      interaction's own saved value;
    - `InteractionFields.tsx`: a "Company (if any)" row on the interaction view;
    - `lib/staff-contacts.ts` types.
  - **Checks:** API and frontend `tsc` clean. InteractionForm lint is identical to HEAD
    (pre-existing messages only, line numbers shifted). InteractionFields and the lib are clean.
  - **Docs:** `api-structure.md` partner row notes the new field. No endpoint or page change.
  - **Note:** `interactionWritable` now always writes `company_name`, so **every staff
    interaction create/update fails until the SQL is run** on that DB. Deploy order: SQL first,
    then the API.

- 2026-10-01: **change 3** made (uncommitted). The Find Person Status button text `t("Add")` →
  `t("Add or Search")` (the existing + icon stays in front), in `PersonForm.tsx` and
  `staff/contacts/interaction/new/page.tsx`. The Organisation form is unchanged. `tsc` clean;
  the interaction/new page's lint is the same as HEAD. Not yet checked in the browser
  (TC-PCI-12..14).

- 2026-10-01: **change 4** made (uncommitted). `SERVICE_OPTIONS` in `interactionQuestions.ts`
  gains the 8 services, in the given order, after Training / Workshop, with "Other" still last.
  No DB or API change. `tsc` and eslint clean. Not yet checked in the browser (TC-PCI-15..17).

- 2026-10-01: the user ran the change-2 ALTER locally. Live verification, as SA (user 1), on
  `partner.niwasi.abhishek/Sunai` — API / DB script plus headless Chromium, **all PASS**.
  - **Change 1:**
    - TC-PCI-01: the person **new** form's sections read Basic Details, Identification
      Details, Additional Personal Details, Address Details, Education & Professional Details,
      Additional Information.
    - TC-PCI-02: the same order on the person **edit** page.
  - **Change 2:**
    - TC-PCI-10: `company_name` is `varchar(150)`, nullable, on `staff_contact_interactions`.
    - TC-PCI-05: the interaction/new Person Details top row is [First Name, Designation, Other
      Mobile No., Company (if any)].
    - TC-PCI-06: "  Sunai Consultancy  " is saved trimmed on the interaction; the person row
      has no company field.
    - TC-PCI-07: a new interaction for an existing person (`?type=person&id=`) has Company empty
      after Edit; the edit page of a saved interaction shows its own value; PUT updates it.
    - TC-PCI-08: 100 characters save, 101 → 422 on `company_name`; the UI input stops at 100
      and shows 100/100.
    - TC-PCI-09: blank or omitted → null.
    - TC-PCI-11: the interaction view shows the "Company (if any)" row; the person view doesn't.
  - **Change 3:**
    - TC-PCI-12 / TC-PCI-13: the person and interaction Find Person buttons read "+ Add or
      Search" for a new mobile, and clicking opens the form as before.
    - TC-PCI-14: the Organisation form still reads "+ Add".
  - **Change 4:**
    - TC-PCI-15: the options are in the planned order, with Other last.
    - TC-PCI-16: "Generic Medicine Zeelabs" saves, shows on the view and is preselected on edit.
    - TC-PCI-17: an interaction with "Home Tuition" is still preselected on edit and shown on
      the view.
  - **Not run:**
    - TC-PCI-03 (Basic Details validation): that code is unchanged, and index 0 is still Basic
      Details.
    - TC-PCI-04 (the Identification values save): the fields are unchanged; only their position
      moved.
  - **Test-script notes:**
    - The first API run used `/persons/:id/interactions`; the route is `/person/:id/…`, so it
      returned 422s. The run was repeated with the right path.
    - The locked `?type=person` page never goes network-idle, so those UI checks wait for the
      page content instead.
  - **Cleanup:** the 2 test persons (ids 50, 51, "ZZPCI Test") and their 7 interactions were
    deleted, after checking every row was a ZZPCI test row.

- 2026-10-01: **change 5** made (uncommitted).
  - `PersonForm.tsx`: `RESIDENCE` gains `"11": "पटना के अन्य भाग"` and `"12": "बिहार के अन्य
    भाग"`. A new ordered `RESIDENCE_OPTIONS` (codes 1–8, 11, 12, 9, 10) feeds the Residence
    select there and in `InteractionForm.tsx`.
  - No DB / API change. `tsc` clean; PersonForm lint identical to HEAD.
  - **Verified live (all PASS):**
    - TC-PCI-18: the order on the interaction form and the person edit form is उजियार, बलिया …
      बक्सर, पटना के अन्य भाग, बिहार के अन्य भाग, अन्य, नहीं मालुम.
    - TC-PCI-19: test persons created via the API with residence 11 / 12 are stored as 11 / 12,
      and the edit form preselects the right Hindi label.
    - TC-PCI-20: an existing person with code 5 still shows पटना बाज़ार समिति.
  - **Cleanup:** the 2 `ZZRES` test persons (ids 52, 53, no interactions) were deleted.

- 2026-10-01: **change 6** made (uncommitted). No DB change: it reuses
  `staff_contact_persons.other_residence`.
  - **API (`staff-contact.*`):**
    - `RESIDENCE_WITH_DETAIL = [11, 12]`;
    - `PersonBody.other_residence` is max 100 (trimmed), and a `superRefine` makes it
      **required** when `residence` is 11 / 12 ("This field is required.");
    - the person write stores `other_residence` only for 11 / 12, otherwise NULL (server-side
      clear).
  - **Frontend:**
    - `PersonForm.tsx`: exports `RESIDENCE_WITH_DETAIL` / `OTHER_RESIDENCE_MAX`;
      `other_residence` added to `BODY_KEYS`; after Residence, a field titled with the option's
      label (FieldShell, `maxLength` 100, `n/100` counter); changing Residence to another option
      clears it; `validateStep(ADDRESS_STEP = 3)` blocks the save if it's blank.
    - `InteractionForm.tsx`: `other_residence` added to `PERSON_EXTRA_KEYS` (so it's in the
      prefill and in every person save path); the same field and clear; the save validation
      requires it when the person's fields are being saved, and opens the panel.
  - **Checks:** API and frontend `tsc` clean; PersonForm and InteractionForm lint identical to
    HEAD.
  - **Verified live (all PASS):**
    - TC-PCI-21, on both forms: the field is titled "पटना के अन्य भाग", retitled "बिहार के अन्य
      भाग" on switching, and hidden for बक्सर / दानापुर.
    - TC-PCI-22: via the API and both UIs, saved `residence` 11 + "कंकड़बाग" and 12 + "गया
      जिला"; the edit page prefills the titled field with the text.
    - TC-PCI-23: a PUT switching to 4 (with stray text) stores `other_residence` NULL; 9
      (अन्य) + text → NULL (Q3).
    - TC-PCI-24: the API returns 422 on `other_residence` for a missing / blank value with 11 /
      12 and for 101 characters, and 100 characters save; both UIs show the inline "This field
      is required." and block the save; the input stops at 100 (100/100).
  - **Cleanup:** 5 `ZZOR` test persons and 1 test interaction were deleted (checked first);
    0 `ZZ…` persons remain.

## 6. Post-deploy

_(none yet)_

## 7. Cross-references

- Code: `apps/frontend/components/partner/contacts/PersonForm.tsx`, `AccordionWizard.tsx`
- Pages: `/{slug}/staff/contacts/persons/new`, `/{slug}/staff/contacts/persons/[id]/edit`
- TEST_CASES: TC-PCI-xx (promote on ship)
