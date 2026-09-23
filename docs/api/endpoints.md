# API Endpoints

Every endpoint in `apps/api`, with the full URL it's served at (after all router mounts from `src/index.ts`). Keep it in sync by hand (see the docs rule in `AGENTS.md`). See [api-structure.md](api-structure.md) for how the API is organised and what each module does.

893 endpoints, grouped by mount. **Guards** are the auth/permission middleware on the route, including router-level ones; permission keys are shown in quotes. **Source** is the file and line where the route is declared.

### `/api/v1/admin` (110)

| Method | Path | Guards | Source |
|---|---|---|---|
| GET | `/api/v1/admin/communities` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/communities.routes.ts:17` |
| POST | `/api/v1/admin/communities` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/communities.routes.ts:20` |
| DELETE | `/api/v1/admin/communities/:id` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/communities.routes.ts:38` |
| GET | `/api/v1/admin/communities/:id` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/communities.routes.ts:23` |
| PUT | `/api/v1/admin/communities/:id` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/communities.routes.ts:31` |
| GET | `/api/v1/admin/communities/:id/available-localities` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/communities.routes.ts:27` |
| DELETE | `/api/v1/admin/communities/:id/localities/:subLocalityId` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/communities.routes.ts:35` |
| GET | `/api/v1/admin/communities/:id/switch` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/communities.routes.ts:41` |
| GET | `/api/v1/admin/contacts` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/contacts.routes.ts:13` |
| DELETE | `/api/v1/admin/contacts/:id` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/contacts.routes.ts:15` |
| GET | `/api/v1/admin/contacts/:id` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/contacts.routes.ts:14` |
| GET | `/api/v1/admin/dashboard/enlist-summary` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/dashboard.routes.ts:20` |
| GET | `/api/v1/admin/dashboard/recent-communities` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/dashboard.routes.ts:18` |
| GET | `/api/v1/admin/dashboard/recent-users` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/dashboard.routes.ts:19` |
| GET | `/api/v1/admin/dashboard/stats` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/dashboard.routes.ts:17` |
| GET | `/api/v1/admin/data-export/business-master` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/upload-download/data-export.routes.ts:20` |
| GET | `/api/v1/admin/data-export/community` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/upload-download/data-export.routes.ts:23` |
| GET | `/api/v1/admin/data-export/community-land-mass` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/upload-download/data-export.routes.ts:18` |
| GET | `/api/v1/admin/data-export/community-location` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/upload-download/data-export.routes.ts:24` |
| GET | `/api/v1/admin/data-export/family-masters` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/upload-download/data-export.routes.ts:19` |
| GET | `/api/v1/admin/data-export/locality` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/upload-download/data-export.routes.ts:21` |
| GET | `/api/v1/admin/data-export/push-notification` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/upload-download/data-export.routes.ts:25` |
| GET | `/api/v1/admin/data-export/sub-locality` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/upload-download/data-export.routes.ts:22` |
| GET | `/api/v1/admin/data-export/user-community-role` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/upload-download/data-export.routes.ts:17` |
| GET | `/api/v1/admin/data-export/user-record` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/upload-download/data-export.routes.ts:28` |
| GET | `/api/v1/admin/location/city-blocks` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:69` |
| POST | `/api/v1/admin/location/city-blocks` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:70` |
| DELETE | `/api/v1/admin/location/city-blocks/:id` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:72` |
| PUT | `/api/v1/admin/location/city-blocks/:id` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:71` |
| PATCH | `/api/v1/admin/location/city-blocks/:id/status` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:73` |
| GET | `/api/v1/admin/location/city-zones` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:76` |
| POST | `/api/v1/admin/location/city-zones` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:77` |
| DELETE | `/api/v1/admin/location/city-zones/:id` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:79` |
| PUT | `/api/v1/admin/location/city-zones/:id` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:78` |
| PATCH | `/api/v1/admin/location/city-zones/:id/status` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:80` |
| GET | `/api/v1/admin/location/countries` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:48` |
| POST | `/api/v1/admin/location/countries` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:49` |
| DELETE | `/api/v1/admin/location/countries/:id` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:51` |
| PUT | `/api/v1/admin/location/countries/:id` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:50` |
| PATCH | `/api/v1/admin/location/countries/:id/status` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:52` |
| GET | `/api/v1/admin/location/districts` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:62` |
| POST | `/api/v1/admin/location/districts` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:63` |
| DELETE | `/api/v1/admin/location/districts/:id` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:65` |
| PUT | `/api/v1/admin/location/districts/:id` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:64` |
| PATCH | `/api/v1/admin/location/districts/:id/status` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:66` |
| GET | `/api/v1/admin/location/enlist/:category` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location-enlist.routes.ts:28` |
| POST | `/api/v1/admin/location/enlist/:category` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location-enlist.routes.ts:30` |
| DELETE | `/api/v1/admin/location/enlist/:category/:id` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location-enlist.routes.ts:34` |
| PUT | `/api/v1/admin/location/enlist/:category/:id` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location-enlist.routes.ts:32` |
| GET | `/api/v1/admin/location/localities` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:91` |
| POST | `/api/v1/admin/location/localities` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:92` |
| DELETE | `/api/v1/admin/location/localities/:id` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:94` |
| PUT | `/api/v1/admin/location/localities/:id` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:93` |
| PATCH | `/api/v1/admin/location/localities/:id/status` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:95` |
| GET | `/api/v1/admin/location/states` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:55` |
| POST | `/api/v1/admin/location/states` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:56` |
| DELETE | `/api/v1/admin/location/states/:id` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:58` |
| PUT | `/api/v1/admin/location/states/:id` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:57` |
| PATCH | `/api/v1/admin/location/states/:id/status` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:59` |
| GET | `/api/v1/admin/location/sub-localities` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:99` |
| POST | `/api/v1/admin/location/sub-localities` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:100` |
| DELETE | `/api/v1/admin/location/sub-localities/:id` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:102` |
| PUT | `/api/v1/admin/location/sub-localities/:id` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:101` |
| PATCH | `/api/v1/admin/location/sub-localities/:id/status` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:103` |
| GET | `/api/v1/admin/location/wards` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:83` |
| POST | `/api/v1/admin/location/wards` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:84` |
| DELETE | `/api/v1/admin/location/wards/:id` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:86` |
| PUT | `/api/v1/admin/location/wards/:id` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:85` |
| PATCH | `/api/v1/admin/location/wards/:id/status` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/location.routes.ts:87` |
| GET | `/api/v1/admin/masters/:group/:master` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/masters.routes.ts:21` |
| POST | `/api/v1/admin/masters/:group/:master` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/masters.routes.ts:24` |
| DELETE | `/api/v1/admin/masters/:group/:master/:id` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/masters.routes.ts:35` |
| PUT | `/api/v1/admin/masters/:group/:master/:id` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/masters.routes.ts:27` |
| PATCH | `/api/v1/admin/masters/:group/:master/:id/status` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/masters.routes.ts:31` |
| GET | `/api/v1/admin/ping` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/admin.routes.ts:40` |
| GET | `/api/v1/admin/populate/family/community-ids` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/populate/family.routes.ts:18` |
| GET | `/api/v1/admin/populate/family/head-ids` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/populate/family.routes.ts:23` |
| GET | `/api/v1/admin/populate/family/head/template` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/populate/family.routes.ts:19` |
| POST | `/api/v1/admin/populate/family/head/upload` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/populate/family.routes.ts:20` |
| GET | `/api/v1/admin/populate/family/member/template` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/populate/family.routes.ts:24` |
| POST | `/api/v1/admin/populate/family/member/upload` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/populate/family.routes.ts:25` |
| GET | `/api/v1/admin/populate/make-user-family-head/sample` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/populate/make-user-family-head.routes.ts:18` |
| POST | `/api/v1/admin/populate/make-user-family-head/upload` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/populate/make-user-family-head.routes.ts:19` |
| GET | `/api/v1/admin/populate/subgroup-shg/community-ids` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/populate/subgroup-shg.routes.ts:18` |
| GET | `/api/v1/admin/populate/subgroup-shg/community-ids-with-niwasi-ids` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/populate/subgroup-shg.routes.ts:23` |
| GET | `/api/v1/admin/populate/subgroup-shg/community-ids-with-shg-ids` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/populate/subgroup-shg.routes.ts:24` |
| GET | `/api/v1/admin/populate/subgroup-shg/member/template` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/populate/subgroup-shg.routes.ts:25` |
| POST | `/api/v1/admin/populate/subgroup-shg/member/upload` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/populate/subgroup-shg.routes.ts:26` |
| GET | `/api/v1/admin/populate/subgroup-shg/shg/template` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/populate/subgroup-shg.routes.ts:19` |
| POST | `/api/v1/admin/populate/subgroup-shg/shg/upload` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/populate/subgroup-shg.routes.ts:20` |
| GET | `/api/v1/admin/service-access` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/service-access.routes.ts:24` |
| POST | `/api/v1/admin/service-access/:id/decision` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/service-access.routes.ts:30` |
| DELETE | `/api/v1/admin/service-access/:id/permissions` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/service-access.routes.ts:53` |
| PATCH | `/api/v1/admin/service-access/:id/permissions` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/service-access.routes.ts:40` |
| GET | `/api/v1/admin/upload-download/city-zone/export` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/upload-download/location-io.routes.ts:19` |
| POST | `/api/v1/admin/upload-download/city-zone/import` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/upload-download/location-io.routes.ts:20` |
| POST | `/api/v1/admin/upload-download/language/add` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/upload-download/language-io.routes.ts:14` |
| GET | `/api/v1/admin/upload-download/language/export` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/upload-download/language-io.routes.ts:15` |
| POST | `/api/v1/admin/upload-download/language/import` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/upload-download/language-io.routes.ts:16` |
| GET | `/api/v1/admin/upload-download/language/list` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/upload-download/language-io.routes.ts:13` |
| GET | `/api/v1/admin/upload-download/tola/export` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/upload-download/location-io.routes.ts:28` |
| POST | `/api/v1/admin/upload-download/tola/import` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/upload-download/location-io.routes.ts:29` |
| GET | `/api/v1/admin/upload-download/village/export` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/upload-download/location-io.routes.ts:25` |
| POST | `/api/v1/admin/upload-download/village/import` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/upload-download/location-io.routes.ts:26` |
| GET | `/api/v1/admin/upload-download/ward/export` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/upload-download/location-io.routes.ts:22` |
| POST | `/api/v1/admin/upload-download/ward/import` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/upload-download/location-io.routes.ts:23` |
| GET | `/api/v1/admin/users` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/users.routes.ts:20` |
| PUT | `/api/v1/admin/users/:id/password` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/users.routes.ts:33` |
| GET | `/api/v1/admin/users/all-community` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/users.routes.ts:30` |
| GET | `/api/v1/admin/users/unified` | `requireAuth`, `requireSystemAdmin` | `src/modules/admin/users.routes.ts:25` |

### `/api/v1/auth` (9)

| Method | Path | Guards | Source |
|---|---|---|---|
| POST | `/api/v1/auth/forgot-password` | public | `src/modules/auth/auth.routes.ts:43` |
| POST | `/api/v1/auth/login` | public | `src/modules/auth/auth.routes.ts:9` |
| POST | `/api/v1/auth/logout` | public | `src/modules/auth/auth.routes.ts:10` |
| GET | `/api/v1/auth/me` | public | `src/modules/auth/auth.routes.ts:11` |
| POST | `/api/v1/auth/register` | public | `src/modules/auth/auth.routes.ts:12` |
| POST | `/api/v1/auth/register-community` | public | `src/modules/auth/auth.routes.ts:21` |
| POST | `/api/v1/auth/register-event` | public | `src/modules/auth/auth.routes.ts:29` |
| POST | `/api/v1/auth/reset-password` | public | `src/modules/auth/auth.routes.ts:44` |
| POST | `/api/v1/auth/verify-key` | `requireAuth` | `src/modules/auth/auth.routes.ts:37` |

### `/api/v1/communities` (2)

| Method | Path | Guards | Source |
|---|---|---|---|
| GET | `/api/v1/communities/lookup` | public | `src/modules/niwasi/community.routes.ts:11` |
| GET | `/api/v1/communities/search` | public | `src/modules/niwasi/community.routes.ts:12` |

### `/api/v1/community` (305)

| Method | Path | Guards | Source |
|---|---|---|---|
| GET | `/api/v1/community/:slug/announcements` | `requireAuth`, `requireCommunityMembership` | `src/modules/community/announcement.routes.ts:64` |
| POST | `/api/v1/community/:slug/announcements` | `requireAuth`, `requireCommunityPermission('announcement.manage')` | `src/modules/community/announcement.routes.ts:73` |
| DELETE | `/api/v1/community/:slug/announcements/:id` | `requireAuth`, `requireCommunityPermission('announcement.manage')` | `src/modules/community/announcement.routes.ts:109` |
| GET | `/api/v1/community/:slug/announcements/:id` | `requireAuth`, `requireCommunityMembership` | `src/modules/community/announcement.routes.ts:83` |
| PUT | `/api/v1/community/:slug/announcements/:id` | `requireAuth`, `requireCommunityPermission('announcement.manage')` | `src/modules/community/announcement.routes.ts:100` |
| GET | `/api/v1/community/:slug/announcements/:id/attachment` | `requireAuth`, `requireCommunityMembership` | `src/modules/community/announcement.routes.ts:90` |
| POST | `/api/v1/community/:slug/announcements/:id/comments` | `requireAuth`, `requireCommunityMembership` | `src/modules/community/announcement.routes.ts:134` |
| DELETE | `/api/v1/community/:slug/announcements/:id/comments/:commentId` | `requireAuth`, `requireCommunityPermission('announcement.manage')` | `src/modules/community/announcement.routes.ts:140` |
| PATCH | `/api/v1/community/:slug/announcements/:id/enable-disable` | `requireAuth`, `requireCommunityPermission('announcement.manage')` | `src/modules/community/announcement.routes.ts:117` |
| POST | `/api/v1/community/:slug/announcements/:id/send` | `requireAuth`, `requireCommunityPermission('announcement.manage')` | `src/modules/community/announcement.routes.ts:125` |
| GET | `/api/v1/community/:slug/announcements/categories` | `requireAuth`, `requireCommunityPermission('announcement.manage')` | `src/modules/community/announcement.routes.ts:47` |
| GET | `/api/v1/community/:slug/announcements/recipients` | `requireAuth`, `requireCommunityPermission('announcement.manage')` | `src/modules/community/announcement.routes.ts:54` |
| GET | `/api/v1/community/:slug/business-members` | `requireAuth`, `requireCommunityPermission('business.manage')` | `src/modules/community/business-member.routes.ts:40` |
| POST | `/api/v1/community/:slug/business-members` | `requireAuth`, `requireCommunityPermission('business.manage')` | `src/modules/community/business-member.routes.ts:48` |
| GET | `/api/v1/community/:slug/community-profile` | `requireAuth`, `requireCommunityPermission('communityProfile.manage')` | `src/modules/community/community-profile.routes.ts:52` |
| PUT | `/api/v1/community/:slug/community-profile` | `requireAuth`, `requireCommunityPermission('communityProfile.manage')` | `src/modules/community/community-profile.routes.ts:59` |
| GET | `/api/v1/community/:slug/community-profile/gallery` | `requireAuth`, `requireCommunityMembership` | `src/modules/community/community-profile.routes.ts:87` |
| POST | `/api/v1/community/:slug/community-profile/gallery` | `requireAuth`, `requireCommunityMembership` | `src/modules/community/community-profile.routes.ts:95` |
| DELETE | `/api/v1/community/:slug/community-profile/gallery/:id` | `requireAuth`, `requireCommunityPermission('communityProfile.manage')` | `src/modules/community/community-profile.routes.ts:117` |
| GET | `/api/v1/community/:slug/community-profile/gallery/:id/picture` | `requireAuth`, `requireCommunityMembership` | `src/modules/community/community-profile.routes.ts:105` |
| GET | `/api/v1/community/:slug/community-profile/logo` | `requireAuth`, `requireCommunityMembership` | `src/modules/community/community-profile.routes.ts:69` |
| GET | `/api/v1/community/:slug/community-profile/summary` | `requireAuth`, `requireCommunityMembership` | `src/modules/community/community-profile.routes.ts:78` |
| GET | `/api/v1/community/:slug/community-service-needs` | `requireAuth`, `requireCommunityPermission('masters.manage')` | `src/modules/community/community-service-need.routes.ts:46` |
| POST | `/api/v1/community/:slug/community-service-needs` | `requireAuth`, `requireCommunityPermission('masters.manage')` | `src/modules/community/community-service-need.routes.ts:55` |
| DELETE | `/api/v1/community/:slug/community-service-needs/:id` | `requireAuth`, `requireCommunityPermission('masters.manage')` | `src/modules/community/community-service-need.routes.ts:80` |
| PATCH | `/api/v1/community/:slug/community-service-needs/:id` | `requireAuth`, `requireCommunityPermission('masters.manage')` | `src/modules/community/community-service-need.routes.ts:71` |
| PUT | `/api/v1/community/:slug/community-service-needs/:id` | `requireAuth`, `requireCommunityPermission('masters.manage')` | `src/modules/community/community-service-need.routes.ts:64` |
| PATCH | `/api/v1/community/:slug/community-service-needs/:id/status` | `requireAuth`, `requireCommunityPermission('masters.manage')` | `src/modules/community/community-service-need.routes.ts:88` |
| GET | `/api/v1/community/:slug/community-service-needs/master-needs` | `requireAuth`, `requireCommunityPermission('masters.manage')` | `src/modules/community/community-service-need.routes.ts:38` |
| GET | `/api/v1/community/:slug/community-users` | `requireAuth`, `requireCommunityPermission('members.manage')` | `src/modules/community/community-user.routes.ts:47` |
| POST | `/api/v1/community/:slug/community-users` | `requireAuth`, `requireCommunityPermission('members.manage')` | `src/modules/community/community-user.routes.ts:59` |
| GET | `/api/v1/community/:slug/community-users/:userId` | `requireAuth`, `requireCommunityPermission('members.manage')` | `src/modules/community/community-user.routes.ts:101` |
| PUT | `/api/v1/community/:slug/community-users/:userId` | `requireAuth`, `requireCommunityPermission('members.manage')` | `src/modules/community/community-user.routes.ts:112` |
| PATCH | `/api/v1/community/:slug/community-users/:userId/status` | `requireAuth`, `requireCommunityPermission('members.manage')` | `src/modules/community/community-user.routes.ts:121` |
| POST | `/api/v1/community/:slug/community-users/:userId/verify` | `requireAuth`, `requireCommunityPermission('members.verify')` | `src/modules/community/community-user.routes.ts:130` |
| GET | `/api/v1/community/:slug/community-users/assignable-roles` | `requireAuth`, `requireCommunityPermission('members.verify')` | `src/modules/community/community-user.routes.ts:89` |
| GET | `/api/v1/community/:slug/community-users/inactive` | `requireAuth`, `requireCommunityPermission('members.manage')` | `src/modules/community/community-user.routes.ts:68` |
| GET | `/api/v1/community/:slug/community-users/pending` | `requireAuth`, `requireCommunityPermission('members.verify')` | `src/modules/community/community-user.routes.ts:80` |
| GET | `/api/v1/community/:slug/contacts/organisations` | `requireAuth`, `requireCommunityPermission` | `src/modules/community/contacts.routes.ts:63` |
| POST | `/api/v1/community/:slug/contacts/organisations` | `requireAuth`, `requireCommunityPermission` | `src/modules/community/contacts.routes.ts:82` |
| DELETE | `/api/v1/community/:slug/contacts/organisations/:id` | `requireAuth`, `requireCommunityPermission` | `src/modules/community/contacts.routes.ts:96` |
| GET | `/api/v1/community/:slug/contacts/organisations/:id` | `requireAuth`, `requireCommunityPermission` | `src/modules/community/contacts.routes.ts:76` |
| PUT | `/api/v1/community/:slug/contacts/organisations/:id` | `requireAuth`, `requireCommunityPermission` | `src/modules/community/contacts.routes.ts:89` |
| GET | `/api/v1/community/:slug/contacts/organisations/lookups` | `requireAuth`, `requireCommunityPermission` | `src/modules/community/contacts.routes.ts:70` |
| GET | `/api/v1/community/:slug/contacts/persons` | `requireAuth`, `requireCommunityPermission` | `src/modules/community/contacts.routes.ts:104` |
| POST | `/api/v1/community/:slug/contacts/persons` | `requireAuth`, `requireCommunityPermission` | `src/modules/community/contacts.routes.ts:117` |
| DELETE | `/api/v1/community/:slug/contacts/persons/:id` | `requireAuth`, `requireCommunityPermission` | `src/modules/community/contacts.routes.ts:131` |
| GET | `/api/v1/community/:slug/contacts/persons/:id` | `requireAuth`, `requireCommunityPermission` | `src/modules/community/contacts.routes.ts:111` |
| PUT | `/api/v1/community/:slug/contacts/persons/:id` | `requireAuth`, `requireCommunityPermission` | `src/modules/community/contacts.routes.ts:124` |
| GET | `/api/v1/community/:slug/context` | `requireAuth` | `src/modules/community/community-portal.routes.ts:45` |
| GET | `/api/v1/community/:slug/dashboard/stats` | `requireAuth`, `requireCommunityPermission('dashboard.view')` | `src/modules/community/community-home.routes.ts:35` |
| GET | `/api/v1/community/:slug/designations` | `requireAuth`, `requireCommunityPermission('subgroup.manage')` | `src/modules/community/designation.routes.ts:43` |
| POST | `/api/v1/community/:slug/designations` | `requireAuth`, `requireCommunityPermission('subgroup.manage')` | `src/modules/community/designation.routes.ts:51` |
| DELETE | `/api/v1/community/:slug/designations/:id` | `requireAuth`, `requireCommunityPermission('subgroup.manage')` | `src/modules/community/designation.routes.ts:67` |
| PUT | `/api/v1/community/:slug/designations/:id` | `requireAuth`, `requireCommunityPermission('subgroup.manage')` | `src/modules/community/designation.routes.ts:59` |
| PATCH | `/api/v1/community/:slug/designations/:id/status` | `requireAuth`, `requireCommunityPermission('subgroup.manage')` | `src/modules/community/designation.routes.ts:75` |
| GET | `/api/v1/community/:slug/family-child` | `requireAuth`, `requireCommunityPermission('family.manage')` | `src/modules/community/family-child.routes.ts:28` |
| GET | `/api/v1/community/:slug/family-members` | `requireAuth`, `requireCommunityPermission('family.manage')` | `src/modules/community/family-member.routes.ts:38` |
| POST | `/api/v1/community/:slug/family-members` | `requireAuth`, `requireCommunityPermission('family.manage')` | `src/modules/community/family-member.routes.ts:53` |
| GET | `/api/v1/community/:slug/family-members/relations` | `requireAuth`, `requireCommunityPermission('family.manage')` | `src/modules/community/family-member.routes.ts:46` |
| GET | `/api/v1/community/:slug/help/donations` | `requireAuth`, `requireCommunityPermission('help.participate')` | `src/modules/help/help-actions.routes.ts:72` |
| POST | `/api/v1/community/:slug/help/donations` | `requireAuth`, `requireCommunityPermission('help.participate')` | `src/modules/help/help-actions.routes.ts:71` |
| GET | `/api/v1/community/:slug/help/donations/:id` | `requireAuth`, `requireCommunityPermission('help.participate')` | `src/modules/help/help-actions.routes.ts:75` |
| GET | `/api/v1/community/:slug/help/donations/create` | `requireAuth`, `requireCommunityPermission('help.participate')` | `src/modules/help/help-actions.routes.ts:70` |
| GET | `/api/v1/community/:slug/help/donations/other-communities` | `requireAuth`, `requireCommunityPermission('help.participate')` | `src/modules/help/help-actions.routes.ts:74` |
| POST | `/api/v1/community/:slug/help/fulfil` | `requireAuth`, `requireCommunityPermission('help.participate')` | `src/modules/help/help-actions.routes.ts:60` |
| GET | `/api/v1/community/:slug/help/help-offered-to-me` | `requireAuth`, `requireCommunityPermission('help.participate')` | `src/modules/help/help-actions.routes.ts:57` |
| GET | `/api/v1/community/:slug/help/helping-persons-for-me` | `requireAuth`, `requireCommunityPermission('help.participate')` | `src/modules/help/help-actions.routes.ts:56` |
| GET | `/api/v1/community/:slug/help/lookups/categories` | `requireAuth`, `requireCommunityPermission('help.participate')` | `src/modules/help/help-actions.routes.ts:82` |
| GET | `/api/v1/community/:slug/help/lookups/groups` | `requireAuth`, `requireCommunityPermission('help.participate')` | `src/modules/help/help-actions.routes.ts:81` |
| GET | `/api/v1/community/:slug/help/lookups/needs` | `requireAuth`, `requireCommunityPermission('help.participate')` | `src/modules/help/help-actions.routes.ts:84` |
| GET | `/api/v1/community/:slug/help/lookups/situations` | `requireAuth`, `requireCommunityPermission('help.participate')` | `src/modules/help/help-actions.routes.ts:86` |
| GET | `/api/v1/community/:slug/help/lookups/sub-categories` | `requireAuth`, `requireCommunityPermission('help.participate')` | `src/modules/help/help-actions.routes.ts:83` |
| GET | `/api/v1/community/:slug/help/lookups/units` | `requireAuth`, `requireCommunityPermission('help.participate')` | `src/modules/help/help-actions.routes.ts:85` |
| GET | `/api/v1/community/:slug/help/my-help` | `requireAuth`, `requireCommunityPermission('help.participate')` | `src/modules/help/help-actions.routes.ts:78` |
| GET | `/api/v1/community/:slug/help/needies` | `requireAuth`, `requireCommunityPermission('help.participate')` | `src/modules/help/help-actions.routes.ts:63` |
| POST | `/api/v1/community/:slug/help/needies` | `requireAuth`, `requireCommunityPermission('help.participate')` | `src/modules/help/help-actions.routes.ts:64` |
| DELETE | `/api/v1/community/:slug/help/needies/:id` | `requireAuth`, `requireCommunityPermission('help.participate')` | `src/modules/help/help-actions.routes.ts:67` |
| GET | `/api/v1/community/:slug/help/needies/:id` | `requireAuth`, `requireCommunityPermission('help.participate')` | `src/modules/help/help-actions.routes.ts:65` |
| PUT | `/api/v1/community/:slug/help/needies/:id` | `requireAuth`, `requireCommunityPermission('help.participate')` | `src/modules/help/help-actions.routes.ts:66` |
| GET | `/api/v1/community/:slug/help/requests` | `requireAuth`, `requireCommunityPermission('help.participate')` | `src/modules/help/help-actions.routes.ts:48` |
| POST | `/api/v1/community/:slug/help/requests` | `requireAuth`, `requireCommunityPermission('help.participate')` | `src/modules/help/help-actions.routes.ts:47` |
| DELETE | `/api/v1/community/:slug/help/requests/:id` | `requireAuth`, `requireCommunityPermission('help.participate')` | `src/modules/help/help-actions.routes.ts:53` |
| GET | `/api/v1/community/:slug/help/requests/:id` | `requireAuth`, `requireCommunityPermission('help.participate')` | `src/modules/help/help-actions.routes.ts:51` |
| PUT | `/api/v1/community/:slug/help/requests/:id` | `requireAuth`, `requireCommunityPermission('help.participate')` | `src/modules/help/help-actions.routes.ts:52` |
| GET | `/api/v1/community/:slug/help/requests/recommended` | `requireAuth`, `requireCommunityPermission('help.participate')` | `src/modules/help/help-actions.routes.ts:50` |
| GET | `/api/v1/community/:slug/information/:type` | `requireAuth`, `requireCommunityMembership` | `src/modules/community/information.routes.ts:64` |
| POST | `/api/v1/community/:slug/information/:type` | `requireAuth`, `requireCommunityPermission('masters.manage')` | `src/modules/community/information.routes.ts:89` |
| DELETE | `/api/v1/community/:slug/information/:type/:id` | `requireAuth`, `requireCommunityPermission('masters.manage')` | `src/modules/community/information.routes.ts:109` |
| GET | `/api/v1/community/:slug/information/:type/:id` | `requireAuth`, `requireCommunityMembership` | `src/modules/community/information.routes.ts:81` |
| PUT | `/api/v1/community/:slug/information/:type/:id` | `requireAuth`, `requireCommunityPermission('masters.manage')` | `src/modules/community/information.routes.ts:99` |
| GET | `/api/v1/community/:slug/information/:type/options` | `requireAuth`, `requireCommunityMembership` | `src/modules/community/information.routes.ts:73` |
| GET | `/api/v1/community/:slug/masters/:catalog` | `requireAuth`, `requireCommunityPermission('masters.manage')` | `src/modules/community/community-master.routes.ts:50` |
| POST | `/api/v1/community/:slug/masters/:catalog` | `requireAuth`, `requireCommunityPermission('masters.manage')` | `src/modules/community/community-master.routes.ts:67` |
| DELETE | `/api/v1/community/:slug/masters/:catalog/:id` | `requireAuth`, `requireCommunityPermission('masters.manage')` | `src/modules/community/community-master.routes.ts:93` |
| PUT | `/api/v1/community/:slug/masters/:catalog/:id` | `requireAuth`, `requireCommunityPermission('masters.manage')` | `src/modules/community/community-master.routes.ts:76` |
| PATCH | `/api/v1/community/:slug/masters/:catalog/:id/status` | `requireAuth`, `requireCommunityPermission('masters.manage')` | `src/modules/community/community-master.routes.ts:85` |
| GET | `/api/v1/community/:slug/masters/:catalog/lookups` | `requireAuth`, `requireCommunityPermission('masters.manage')` | `src/modules/community/community-master.routes.ts:59` |
| GET | `/api/v1/community/:slug/my-community` | `requireAuth`, `requireCommunityMembership` | `src/modules/community/my-community.routes.ts:23` |
| POST | `/api/v1/community/:slug/my-community/:id/default` | `requireAuth`, `requireCommunityMembership` | `src/modules/community/my-community.routes.ts:43` |
| POST | `/api/v1/community/:slug/my-community/:id/join` | `requireAuth`, `requireCommunityMembership` | `src/modules/community/my-community.routes.ts:35` |
| GET | `/api/v1/community/:slug/notifications` | `requireAuth`, `requireCommunityMembership` | `src/modules/community/notification.routes.ts:40` |
| DELETE | `/api/v1/community/:slug/notifications/:id` | `requireAuth`, `requireCommunityMembership` | `src/modules/community/notification.routes.ts:81` |
| GET | `/api/v1/community/:slug/notifications/:id` | `requireAuth`, `requireCommunityMembership` | `src/modules/community/notification.routes.ts:73` |
| POST | `/api/v1/community/:slug/notifications/:id/read` | `requireAuth`, `requireCommunityMembership` | `src/modules/community/notification.routes.ts:65` |
| POST | `/api/v1/community/:slug/notifications/read` | `requireAuth`, `requireCommunityMembership` | `src/modules/community/notification.routes.ts:49` |
| POST | `/api/v1/community/:slug/notifications/read/:type` | `requireAuth`, `requireCommunityMembership` | `src/modules/community/notification.routes.ts:56` |
| GET | `/api/v1/community/:slug/panchayat-data/:leaf` | `requireAuth`, `requireCommunityPermission('masters.manage')` | `src/modules/community/panchayat-data.routes.ts:49` |
| POST | `/api/v1/community/:slug/panchayat-data/:leaf` | `requireAuth`, `requireCommunityPermission('masters.manage')` | `src/modules/community/panchayat-data.routes.ts:66` |
| DELETE | `/api/v1/community/:slug/panchayat-data/:leaf/:id` | `requireAuth`, `requireCommunityPermission('masters.manage')` | `src/modules/community/panchayat-data.routes.ts:84` |
| PUT | `/api/v1/community/:slug/panchayat-data/:leaf/:id` | `requireAuth`, `requireCommunityPermission('masters.manage')` | `src/modules/community/panchayat-data.routes.ts:75` |
| PATCH | `/api/v1/community/:slug/panchayat-data/:leaf/:id/status` | `requireAuth`, `requireCommunityPermission('masters.manage')` | `src/modules/community/panchayat-data.routes.ts:92` |
| GET | `/api/v1/community/:slug/panchayat-data/:leaf/options` | `requireAuth`, `requireCommunityPermission('masters.manage')` | `src/modules/community/panchayat-data.routes.ts:58` |
| GET | `/api/v1/community/:slug/payment` | `requireAuth`, `requireCommunityMembership` | `src/modules/community/payment.routes.ts:48` |
| POST | `/api/v1/community/:slug/payment` | `requireAuth`, `requireCommunityMembership` | `src/modules/community/payment.routes.ts:83` |
| GET | `/api/v1/community/:slug/payment/:id` | `requireAuth`, `requireCommunityMembership` | `src/modules/community/payment.routes.ts:101` |
| POST | `/api/v1/community/:slug/payment/calculate` | `requireAuth`, `requireCommunityMembership` | `src/modules/community/payment.routes.ts:65` |
| POST | `/api/v1/community/:slug/payment/calculate-revision` | `requireAuth`, `requireCommunityMembership` | `src/modules/community/payment.routes.ts:74` |
| GET | `/api/v1/community/:slug/payment/form` | `requireAuth`, `requireCommunityMembership` | `src/modules/community/payment.routes.ts:57` |
| POST | `/api/v1/community/:slug/payment/revision` | `requireAuth`, `requireCommunityMembership` | `src/modules/community/payment.routes.ts:92` |
| GET | `/api/v1/community/:slug/populate/{entity}/export` | `requireAuth`, `requireCommunityPermission('populate.manage')` | `src/modules/community/populate.routes.ts:46` |
| POST | `/api/v1/community/:slug/populate/{entity}/import` | `requireAuth`, `requireCommunityPermission('populate.manage')` | `src/modules/community/populate.routes.ts:47` |
| GET | `/api/v1/community/:slug/populate/{entity}/sample` | `requireAuth`, `requireCommunityPermission('populate.manage')` | `src/modules/community/populate.routes.ts:45` |
| POST | `/api/v1/community/:slug/populate/dummy` | `requireAuth`, `requireCommunityPermission('populate.manage')` | `src/modules/community/populate.routes.ts:41` |
| GET | `/api/v1/community/:slug/properties` | `requireAuth`, `requireCommunityPermission('property.manage')` | `src/modules/community/property.routes.ts:67` |
| POST | `/api/v1/community/:slug/properties` | `requireAuth`, `requireCommunityPermission('property.manage')` | `src/modules/community/property.routes.ts:74` |
| DELETE | `/api/v1/community/:slug/properties/:id` | `requireAuth`, `requireCommunityPermission('property.manage')` | `src/modules/community/property.routes.ts:95` |
| GET | `/api/v1/community/:slug/properties/:id` | `requireAuth`, `requireCommunityPermission('property.manage')` | `src/modules/community/property.routes.ts:82` |
| PUT | `/api/v1/community/:slug/properties/:id` | `requireAuth`, `requireCommunityPermission('property.manage')` | `src/modules/community/property.routes.ts:88` |
| GET | `/api/v1/community/:slug/properties/:id/owners` | `requireAuth`, `requireCommunityPermission('property.manage')` | `src/modules/community/property.routes.ts:103` |
| POST | `/api/v1/community/:slug/properties/:id/owners` | `requireAuth`, `requireCommunityPermission('property.manage')` | `src/modules/community/property.routes.ts:109` |
| DELETE | `/api/v1/community/:slug/properties/:id/owners/:ownerId` | `requireAuth`, `requireCommunityPermission('property.manage')` | `src/modules/community/property.routes.ts:116` |
| GET | `/api/v1/community/:slug/properties/land-masses` | `requireAuth`, `requireCommunityPermission('property.manage')` | `src/modules/community/property.routes.ts:59` |
| GET | `/api/v1/community/:slug/properties/lookups` | `requireAuth`, `requireCommunityPermission('property.manage')` | `src/modules/community/property.routes.ts:53` |
| GET | `/api/v1/community/:slug/property-owners` | `requireAuth`, `requireCommunityPermission('property.manage')` | `src/modules/community/property.routes.ts:138` |
| POST | `/api/v1/community/:slug/property-owners` | `requireAuth`, `requireCommunityPermission('property.manage')` | `src/modules/community/property.routes.ts:145` |
| DELETE | `/api/v1/community/:slug/property-owners/:id` | `requireAuth`, `requireCommunityPermission('property.manage')` | `src/modules/community/property.routes.ts:166` |
| GET | `/api/v1/community/:slug/property-owners/:id` | `requireAuth`, `requireCommunityPermission('property.manage')` | `src/modules/community/property.routes.ts:153` |
| PUT | `/api/v1/community/:slug/property-owners/:id` | `requireAuth`, `requireCommunityPermission('property.manage')` | `src/modules/community/property.routes.ts:159` |
| GET | `/api/v1/community/:slug/property-owners/lookups` | `requireAuth`, `requireCommunityPermission('property.manage')` | `src/modules/community/property.routes.ts:131` |
| GET | `/api/v1/community/:slug/residents` | `requireAuth`, `requireCommunityPermission('directory.view')` | `src/modules/community/community-home.routes.ts:43` |
| GET | `/api/v1/community/:slug/sabha` | `requireAuth`, `requireCommunityPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:120` |
| POST | `/api/v1/community/:slug/sabha` | `requireAuth`, `requireCommunityPermission('sabha.manage')` | `src/modules/community/sabha.routes.ts:119` |
| GET | `/api/v1/community/:slug/sabha/:id` | `requireAuth`, `requireCommunityPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:121` |
| PUT | `/api/v1/community/:slug/sabha/:id` | `requireAuth`, `requireCommunityPermission('sabha.manage')` | `src/modules/community/sabha.routes.ts:122` |
| GET | `/api/v1/community/:slug/sabha/:id/agenda` | `requireAuth`, `requireCommunityPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:137` |
| POST | `/api/v1/community/:slug/sabha/:id/agenda` | `requireAuth`, `requireCommunityPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:129` |
| DELETE | `/api/v1/community/:slug/sabha/:id/agenda/:agendaId` | `requireAuth`, `requireCommunityPermission('sabha.manage')` | `src/modules/community/sabha.routes.ts:162` |
| GET | `/api/v1/community/:slug/sabha/:id/agenda/:agendaId` | `requireAuth`, `requireCommunityPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:138` |
| PUT | `/api/v1/community/:slug/sabha/:id/agenda/:agendaId` | `requireAuth`, `requireCommunityPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:140` |
| GET | `/api/v1/community/:slug/sabha/:id/agenda/:agendaId/attachment` | `requireAuth`, `requireCommunityPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:139` |
| GET | `/api/v1/community/:slug/sabha/:id/agenda/:agendaId/comments` | `requireAuth`, `requireCommunityPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:163` |
| POST | `/api/v1/community/:slug/sabha/:id/agenda/:agendaId/comments` | `requireAuth`, `requireCommunityPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:164` |
| POST | `/api/v1/community/:slug/sabha/:id/agenda/:agendaId/proposal-not-required` | `requireAuth`, `requireCommunityPermission('sabha.manage')` | `src/modules/community/sabha.routes.ts:156` |
| PATCH | `/api/v1/community/:slug/sabha/:id/agenda/:agendaId/status` | `requireAuth`, `requireCommunityPermission('sabha.manage')` | `src/modules/community/sabha.routes.ts:149` |
| POST | `/api/v1/community/:slug/sabha/:id/agenda/:agendaId/vote` | `requireAuth`, `requireCommunityPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:148` |
| POST | `/api/v1/community/:slug/sabha/:id/attendance` | `requireAuth`, `requireCommunityPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:126` |
| PATCH | `/api/v1/community/:slug/sabha/:id/datetime` | `requireAuth`, `requireCommunityPermission('sabha.manage')` | `src/modules/community/sabha.routes.ts:124` |
| POST | `/api/v1/community/:slug/sabha/:id/extend` | `requireAuth`, `requireCommunityPermission('sabha.manage')` | `src/modules/community/sabha.routes.ts:125` |
| GET | `/api/v1/community/:slug/sabha/:id/proposals` | `requireAuth`, `requireCommunityPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:174` |
| POST | `/api/v1/community/:slug/sabha/:id/proposals` | `requireAuth`, `requireCommunityPermission('sabha.manage')` | `src/modules/community/sabha.routes.ts:173` |
| DELETE | `/api/v1/community/:slug/sabha/:id/proposals/:proposalId` | `requireAuth`, `requireCommunityPermission('sabha.manage')` | `src/modules/community/sabha.routes.ts:190` |
| GET | `/api/v1/community/:slug/sabha/:id/proposals/:proposalId` | `requireAuth`, `requireCommunityPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:175` |
| PUT | `/api/v1/community/:slug/sabha/:id/proposals/:proposalId` | `requireAuth`, `requireCommunityPermission('sabha.manage')` | `src/modules/community/sabha.routes.ts:176` |
| GET | `/api/v1/community/:slug/sabha/:id/proposals/:proposalId/comments` | `requireAuth`, `requireCommunityPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:191` |
| POST | `/api/v1/community/:slug/sabha/:id/proposals/:proposalId/comments` | `requireAuth`, `requireCommunityPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:192` |
| POST | `/api/v1/community/:slug/sabha/:id/proposals/:proposalId/vote` | `requireAuth`, `requireCommunityPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:183` |
| PATCH | `/api/v1/community/:slug/sabha/:id/status` | `requireAuth`, `requireCommunityPermission('sabha.manage')` | `src/modules/community/sabha.routes.ts:123` |
| GET | `/api/v1/community/:slug/sabha/attendance` | `requireAuth`, `requireCommunityPermission('sabha.manage')` | `src/modules/community/sabha.routes.ts:99` |
| GET | `/api/v1/community/:slug/sabha/decisions` | `requireAuth`, `requireCommunityPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:101` |
| GET | `/api/v1/community/:slug/sabha/decisions/:id` | `requireAuth`, `requireCommunityPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:102` |
| GET | `/api/v1/community/:slug/sabha/lookups` | `requireAuth`, `requireCommunityPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:93` |
| GET | `/api/v1/community/:slug/sabha/urgent` | `requireAuth`, `requireCommunityPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:113` |
| POST | `/api/v1/community/:slug/sabha/urgent` | `requireAuth` | `src/modules/community/sabha.routes.ts:112` |
| GET | `/api/v1/community/:slug/sabha/urgent/:id` | `requireAuth`, `requireCommunityPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:114` |
| POST | `/api/v1/community/:slug/sabha/urgent/:id/consent` | `requireAuth`, `requireCommunityPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:115` |
| POST | `/api/v1/community/:slug/sabha/urgent/:id/promote` | `requireAuth`, `requireCommunityPermission('sabha.manage')` | `src/modules/community/sabha.routes.ts:116` |
| GET | `/api/v1/community/:slug/service-access` | `requireAuth`, `requireCommunityPermission('serviceAccess.grant')` | `src/modules/community/service-access.routes.ts:38` |
| GET | `/api/v1/community/:slug/service-access/:id` | `requireAuth`, `requireCommunityPermission('serviceAccess.grant')` | `src/modules/community/service-access.routes.ts:46` |
| PATCH | `/api/v1/community/:slug/service-access/:id` | `requireAuth`, `requireCommunityPermission('serviceAccess.grant')` | `src/modules/community/service-access.routes.ts:53` |
| DELETE | `/api/v1/community/:slug/service-access/:id/permissions` | `requireAuth`, `requireCommunityPermission('serviceAccess.grant')` | `src/modules/community/service-access.routes.ts:66` |
| GET | `/api/v1/community/:slug/service-providers` | `requireAuth`, `requireCommunityMembership` | `src/modules/community/service-provider.routes.ts:68` |
| GET | `/api/v1/community/:slug/service-providers/match` | `requireAuth`, `requireCommunityPermission('serviceAccess.grant')` | `src/modules/community/service-provider.routes.ts:50` |
| POST | `/api/v1/community/:slug/service-providers/register` | `requireAuth`, `requireCommunityPermission('serviceAccess.grant')` | `src/modules/community/service-provider.routes.ts:59` |
| GET | `/api/v1/community/:slug/service-providers/service-needs` | `requireAuth`, `requireCommunityPermission('serviceAccess.grant')` | `src/modules/community/service-provider.routes.ts:42` |
| GET | `/api/v1/community/:slug/society-fee/bills` | `requireAuth`, `requireCommunityPermission('societyFee.manage')` | `src/modules/community/society-fee.routes.ts:83` |
| POST | `/api/v1/community/:slug/society-fee/bills` | `requireAuth`, `requireCommunityPermission('societyFee.manage')` | `src/modules/community/society-fee.routes.ts:92` |
| GET | `/api/v1/community/:slug/society-fee/bills/:id` | `requireAuth`, `requireCommunityMembership` | `src/modules/community/society-fee.routes.ts:101` |
| GET | `/api/v1/community/:slug/society-fee/create-form` | `requireAuth`, `requireCommunityPermission('societyFee.manage')` | `src/modules/community/society-fee.routes.ts:66` |
| GET | `/api/v1/community/:slug/society-fee/dues` | `requireAuth`, `requireCommunityPermission('societyFee.manage')` | `src/modules/community/society-fee.routes.ts:74` |
| GET | `/api/v1/community/:slug/society-fee/my-properties` | `requireAuth`, `requireCommunityMembership` | `src/modules/community/society-fee.routes.ts:58` |
| GET | `/api/v1/community/:slug/society-fee/payment-confirmation` | `requireAuth`, `requireCommunityPermission('societyFee.manage')` | `src/modules/community/society-fee.routes.ts:142` |
| POST | `/api/v1/community/:slug/society-fee/payments` | `requireAuth`, `requireCommunityMembership` | `src/modules/community/society-fee.routes.ts:133` |
| POST | `/api/v1/community/:slug/society-fee/payments/:paymentId/confirm` | `requireAuth`, `requireCommunityPermission('societyFee.manage')` | `src/modules/community/society-fee.routes.ts:148` |
| GET | `/api/v1/community/:slug/society-fee/payments/:paymentId/receipt` | `requireAuth`, `requireCommunityPermission('societyFee.manage')` | `src/modules/community/society-fee.routes.ts:162` |
| GET | `/api/v1/community/:slug/society-fee/properties/:propertyId/current-bill` | `requireAuth`, `requireCommunityMembership` | `src/modules/community/society-fee.routes.ts:170` |
| GET | `/api/v1/community/:slug/society-fee/properties/:propertyId/generated-bills` | `requireAuth`, `requireCommunityMembership` | `src/modules/community/society-fee.routes.ts:176` |
| GET | `/api/v1/community/:slug/society-fee/properties/:propertyId/owner` | `requireAuth`, `requireCommunityPermission('societyFee.manage')` | `src/modules/community/society-fee.routes.ts:109` |
| GET | `/api/v1/community/:slug/society-fee/properties/:propertyId/paid-bills` | `requireAuth`, `requireCommunityMembership` | `src/modules/community/society-fee.routes.ts:182` |
| GET | `/api/v1/community/:slug/society-fee/properties/:propertyId/pay-form` | `requireAuth`, `requireCommunityMembership` | `src/modules/community/society-fee.routes.ts:125` |
| GET | `/api/v1/community/:slug/society-fee/properties/:propertyId/summary` | `requireAuth`, `requireCommunityMembership` | `src/modules/community/society-fee.routes.ts:117` |
| GET | `/api/v1/community/:slug/society-fee/received-payments` | `requireAuth`, `requireCommunityPermission('societyFee.manage')` | `src/modules/community/society-fee.routes.ts:156` |
| GET | `/api/v1/community/:slug/structures/:category` | `requireAuth`, `requireCommunityPermission('property.manage')` | `src/modules/community/community-structure.routes.ts:50` |
| POST | `/api/v1/community/:slug/structures/:category` | `requireAuth`, `requireCommunityPermission('property.manage')` | `src/modules/community/community-structure.routes.ts:58` |
| DELETE | `/api/v1/community/:slug/structures/:category/:id` | `requireAuth`, `requireCommunityPermission('property.manage')` | `src/modules/community/community-structure.routes.ts:76` |
| GET | `/api/v1/community/:slug/structures/:category/:id` | `requireAuth`, `requireCommunityPermission('property.manage')` | `src/modules/community/community-structure.routes.ts:66` |
| PUT | `/api/v1/community/:slug/structures/:category/:id` | `requireAuth`, `requireCommunityPermission('property.manage')` | `src/modules/community/community-structure.routes.ts:68` |
| GET | `/api/v1/community/:slug/structures/all-entities` | `requireAuth`, `requireCommunityPermission('property.manage')` | `src/modules/community/community-structure.routes.ts:42` |
| GET | `/api/v1/community/:slug/structures/lookups` | `requireAuth`, `requireCommunityPermission('property.manage')` | `src/modules/community/community-structure.routes.ts:40` |
| GET | `/api/v1/community/:slug/sub-groups` | `requireAuth`, `requireCommunityPermission('subgroup.manage')` | `src/modules/community/sub-group.routes.ts:49` |
| POST | `/api/v1/community/:slug/sub-groups` | `requireAuth`, `requireCommunityPermission('subgroup.manage')` | `src/modules/community/sub-group.routes.ts:48` |
| DELETE | `/api/v1/community/:slug/sub-groups/:id` | `requireAuth`, `requireSubGroupPermission('subgroup.manage')` | `src/modules/community/sub-group.routes.ts:96` |
| GET | `/api/v1/community/:slug/sub-groups/:id` | `requireAuth`, `requireSubGroupPermission('subgroup.participate')` | `src/modules/community/sub-group.routes.ts:82` |
| PUT | `/api/v1/community/:slug/sub-groups/:id` | `requireAuth`, `requireSubGroupPermission('subgroup.manage')` | `src/modules/community/sub-group.routes.ts:95` |
| GET | `/api/v1/community/:slug/sub-groups/:id/access` | `requireAuth`, `requireSubGroupPermission('subgroup.access.grant')` | `src/modules/community/sub-group.routes.ts:161` |
| POST | `/api/v1/community/:slug/sub-groups/:id/access` | `requireAuth`, `requireSubGroupPermission('subgroup.access.grant')` | `src/modules/community/sub-group.routes.ts:162` |
| GET | `/api/v1/community/:slug/sub-groups/:id/dashboard` | `requireAuth`, `requireSubGroupPermission('subgroup.participate')` | `src/modules/community/sub-group.routes.ts:83` |
| GET | `/api/v1/community/:slug/sub-groups/:id/designations` | `requireAuth`, `requireSubGroupPermission('subgroup.participate')` | `src/modules/community/sub-group.routes.ts:101` |
| GET | `/api/v1/community/:slug/sub-groups/:id/eligible-users` | `requireAuth`, `requireSubGroupPermission('subgroup.manage')` | `src/modules/community/sub-group.routes.ts:100` |
| GET | `/api/v1/community/:slug/sub-groups/:id/members` | `requireAuth`, `requireSubGroupPermission('subgroup.participate')` | `src/modules/community/sub-group.routes.ts:99` |
| POST | `/api/v1/community/:slug/sub-groups/:id/members` | `requireAuth`, `requireSubGroupPermission('subgroup.manage')` | `src/modules/community/sub-group.routes.ts:102` |
| DELETE | `/api/v1/community/:slug/sub-groups/:id/members/:memberId` | `requireAuth`, `requireSubGroupPermission('subgroup.manage')` | `src/modules/community/sub-group.routes.ts:116` |
| PUT | `/api/v1/community/:slug/sub-groups/:id/members/:memberId` | `requireAuth`, `requireSubGroupPermission('subgroup.manage')` | `src/modules/community/sub-group.routes.ts:109` |
| POST | `/api/v1/community/:slug/sub-groups/:id/populate/csv` | `requireAuth`, `requireSubGroupPermission('subgroup.manage')` | `src/modules/community/sub-group.routes.ts:152` |
| GET | `/api/v1/community/:slug/sub-groups/:id/populate/lookups` | `requireAuth`, `requireSubGroupPermission('subgroup.manage')` | `src/modules/community/sub-group.routes.ts:133` |
| POST | `/api/v1/community/:slug/sub-groups/:id/populate/members` | `requireAuth`, `requireSubGroupPermission('subgroup.manage')` | `src/modules/community/sub-group.routes.ts:139` |
| GET | `/api/v1/community/:slug/sub-groups/:id/populate/sample` | `requireAuth`, `requireSubGroupPermission('subgroup.manage')` | `src/modules/community/sub-group.routes.ts:146` |
| GET | `/api/v1/community/:slug/sub-groups/:subGroupId/announcements` | `requireAuth`, `requireSubGroupPermission` | `src/modules/community/sub-group-announcement.routes.ts:70` |
| POST | `/api/v1/community/:slug/sub-groups/:subGroupId/announcements` | `requireAuth`, `requireSubGroupPermission` | `src/modules/community/sub-group-announcement.routes.ts:77` |
| DELETE | `/api/v1/community/:slug/sub-groups/:subGroupId/announcements/:id` | `requireAuth`, `requireSubGroupPermission` | `src/modules/community/sub-group-announcement.routes.ts:157` |
| GET | `/api/v1/community/:slug/sub-groups/:subGroupId/announcements/:id` | `requireAuth`, `requireSubGroupPermission` | `src/modules/community/sub-group-announcement.routes.ts:136` |
| PUT | `/api/v1/community/:slug/sub-groups/:subGroupId/announcements/:id` | `requireAuth`, `requireSubGroupPermission` | `src/modules/community/sub-group-announcement.routes.ts:150` |
| GET | `/api/v1/community/:slug/sub-groups/:subGroupId/announcements/:id/attachment` | `requireAuth`, `requireSubGroupPermission` | `src/modules/community/sub-group-announcement.routes.ts:142` |
| PATCH | `/api/v1/community/:slug/sub-groups/:subGroupId/announcements/:id/enable-disable` | `requireAuth`, `requireSubGroupPermission` | `src/modules/community/sub-group-announcement.routes.ts:163` |
| GET | `/api/v1/community/:slug/sub-groups/:subGroupId/announcements/categories` | `requireAuth`, `requireSubGroupPermission` | `src/modules/community/sub-group-announcement.routes.ts:100` |
| POST | `/api/v1/community/:slug/sub-groups/:subGroupId/announcements/categories` | `requireAuth`, `requireSubGroupPermission` | `src/modules/community/sub-group-announcement.routes.ts:107` |
| DELETE | `/api/v1/community/:slug/sub-groups/:subGroupId/announcements/categories/:catId` | `requireAuth`, `requireSubGroupPermission` | `src/modules/community/sub-group-announcement.routes.ts:121` |
| PUT | `/api/v1/community/:slug/sub-groups/:subGroupId/announcements/categories/:catId` | `requireAuth`, `requireSubGroupPermission` | `src/modules/community/sub-group-announcement.routes.ts:114` |
| PATCH | `/api/v1/community/:slug/sub-groups/:subGroupId/announcements/categories/:catId/status` | `requireAuth`, `requireSubGroupPermission` | `src/modules/community/sub-group-announcement.routes.ts:128` |
| GET | `/api/v1/community/:slug/sub-groups/:subGroupId/announcements/category-options` | `requireAuth`, `requireSubGroupPermission` | `src/modules/community/sub-group-announcement.routes.ts:86` |
| GET | `/api/v1/community/:slug/sub-groups/:subGroupId/announcements/recipients` | `requireAuth`, `requireSubGroupPermission` | `src/modules/community/sub-group-announcement.routes.ts:92` |
| GET | `/api/v1/community/:slug/sub-groups/:subGroupId/committee-users` | `requireAuth`, `requireSubGroupPermission` | `src/modules/community/sub-group-master.routes.ts:104` |
| GET | `/api/v1/community/:slug/sub-groups/:subGroupId/contacts/organisations` | `requireAuth`, `requireSubGroupPermission` | `src/modules/community/sub-group-contacts.routes.ts:57` |
| POST | `/api/v1/community/:slug/sub-groups/:subGroupId/contacts/organisations` | `requireAuth`, `requireSubGroupPermission` | `src/modules/community/sub-group-contacts.routes.ts:76` |
| DELETE | `/api/v1/community/:slug/sub-groups/:subGroupId/contacts/organisations/:orgId` | `requireAuth`, `requireSubGroupPermission` | `src/modules/community/sub-group-contacts.routes.ts:90` |
| GET | `/api/v1/community/:slug/sub-groups/:subGroupId/contacts/organisations/:orgId` | `requireAuth`, `requireSubGroupPermission` | `src/modules/community/sub-group-contacts.routes.ts:70` |
| PUT | `/api/v1/community/:slug/sub-groups/:subGroupId/contacts/organisations/:orgId` | `requireAuth`, `requireSubGroupPermission` | `src/modules/community/sub-group-contacts.routes.ts:83` |
| GET | `/api/v1/community/:slug/sub-groups/:subGroupId/contacts/organisations/lookups` | `requireAuth`, `requireSubGroupPermission` | `src/modules/community/sub-group-contacts.routes.ts:64` |
| GET | `/api/v1/community/:slug/sub-groups/:subGroupId/contacts/persons` | `requireAuth`, `requireSubGroupPermission` | `src/modules/community/sub-group-contacts.routes.ts:98` |
| POST | `/api/v1/community/:slug/sub-groups/:subGroupId/contacts/persons` | `requireAuth`, `requireSubGroupPermission` | `src/modules/community/sub-group-contacts.routes.ts:111` |
| DELETE | `/api/v1/community/:slug/sub-groups/:subGroupId/contacts/persons/:personId` | `requireAuth`, `requireSubGroupPermission` | `src/modules/community/sub-group-contacts.routes.ts:125` |
| GET | `/api/v1/community/:slug/sub-groups/:subGroupId/contacts/persons/:personId` | `requireAuth`, `requireSubGroupPermission` | `src/modules/community/sub-group-contacts.routes.ts:105` |
| PUT | `/api/v1/community/:slug/sub-groups/:subGroupId/contacts/persons/:personId` | `requireAuth`, `requireSubGroupPermission` | `src/modules/community/sub-group-contacts.routes.ts:118` |
| GET | `/api/v1/community/:slug/sub-groups/:subGroupId/inactive-committee-users` | `requireAuth`, `requireSubGroupPermission` | `src/modules/community/sub-group-master.routes.ts:113` |
| GET | `/api/v1/community/:slug/sub-groups/:subGroupId/meeting-venues` | `requireAuth`, `requireSubGroupPermission` | `src/modules/community/sub-group-master.routes.ts:68` |
| POST | `/api/v1/community/:slug/sub-groups/:subGroupId/meeting-venues` | `requireAuth`, `requireSubGroupPermission` | `src/modules/community/sub-group-master.routes.ts:75` |
| DELETE | `/api/v1/community/:slug/sub-groups/:subGroupId/meeting-venues/:mvId` | `requireAuth`, `requireSubGroupPermission` | `src/modules/community/sub-group-master.routes.ts:89` |
| PUT | `/api/v1/community/:slug/sub-groups/:subGroupId/meeting-venues/:mvId` | `requireAuth`, `requireSubGroupPermission` | `src/modules/community/sub-group-master.routes.ts:82` |
| PATCH | `/api/v1/community/:slug/sub-groups/:subGroupId/meeting-venues/:mvId/status` | `requireAuth`, `requireSubGroupPermission` | `src/modules/community/sub-group-master.routes.ts:96` |
| GET | `/api/v1/community/:slug/sub-groups/:subGroupId/sabha` | `requireAuth`, `requireSubGroupPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:120` |
| POST | `/api/v1/community/:slug/sub-groups/:subGroupId/sabha` | `requireAuth`, `requireSubGroupPermission('sabha.manage')` | `src/modules/community/sabha.routes.ts:119` |
| GET | `/api/v1/community/:slug/sub-groups/:subGroupId/sabha/:id` | `requireAuth`, `requireSubGroupPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:121` |
| PUT | `/api/v1/community/:slug/sub-groups/:subGroupId/sabha/:id` | `requireAuth`, `requireSubGroupPermission('sabha.manage')` | `src/modules/community/sabha.routes.ts:122` |
| GET | `/api/v1/community/:slug/sub-groups/:subGroupId/sabha/:id/agenda` | `requireAuth`, `requireSubGroupPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:137` |
| POST | `/api/v1/community/:slug/sub-groups/:subGroupId/sabha/:id/agenda` | `requireAuth`, `requireSubGroupPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:129` |
| DELETE | `/api/v1/community/:slug/sub-groups/:subGroupId/sabha/:id/agenda/:agendaId` | `requireAuth`, `requireSubGroupPermission('sabha.manage')` | `src/modules/community/sabha.routes.ts:162` |
| GET | `/api/v1/community/:slug/sub-groups/:subGroupId/sabha/:id/agenda/:agendaId` | `requireAuth`, `requireSubGroupPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:138` |
| PUT | `/api/v1/community/:slug/sub-groups/:subGroupId/sabha/:id/agenda/:agendaId` | `requireAuth`, `requireSubGroupPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:140` |
| GET | `/api/v1/community/:slug/sub-groups/:subGroupId/sabha/:id/agenda/:agendaId/attachment` | `requireAuth`, `requireSubGroupPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:139` |
| GET | `/api/v1/community/:slug/sub-groups/:subGroupId/sabha/:id/agenda/:agendaId/comments` | `requireAuth`, `requireSubGroupPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:163` |
| POST | `/api/v1/community/:slug/sub-groups/:subGroupId/sabha/:id/agenda/:agendaId/comments` | `requireAuth`, `requireSubGroupPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:164` |
| POST | `/api/v1/community/:slug/sub-groups/:subGroupId/sabha/:id/agenda/:agendaId/proposal-not-required` | `requireAuth`, `requireSubGroupPermission('sabha.manage')` | `src/modules/community/sabha.routes.ts:156` |
| PATCH | `/api/v1/community/:slug/sub-groups/:subGroupId/sabha/:id/agenda/:agendaId/status` | `requireAuth`, `requireSubGroupPermission('sabha.manage')` | `src/modules/community/sabha.routes.ts:149` |
| POST | `/api/v1/community/:slug/sub-groups/:subGroupId/sabha/:id/agenda/:agendaId/vote` | `requireAuth`, `requireSubGroupPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:148` |
| POST | `/api/v1/community/:slug/sub-groups/:subGroupId/sabha/:id/attendance` | `requireAuth`, `requireSubGroupPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:126` |
| PATCH | `/api/v1/community/:slug/sub-groups/:subGroupId/sabha/:id/datetime` | `requireAuth`, `requireSubGroupPermission('sabha.manage')` | `src/modules/community/sabha.routes.ts:124` |
| POST | `/api/v1/community/:slug/sub-groups/:subGroupId/sabha/:id/extend` | `requireAuth`, `requireSubGroupPermission('sabha.manage')` | `src/modules/community/sabha.routes.ts:125` |
| GET | `/api/v1/community/:slug/sub-groups/:subGroupId/sabha/:id/proposals` | `requireAuth`, `requireSubGroupPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:174` |
| POST | `/api/v1/community/:slug/sub-groups/:subGroupId/sabha/:id/proposals` | `requireAuth`, `requireSubGroupPermission('sabha.manage')` | `src/modules/community/sabha.routes.ts:173` |
| DELETE | `/api/v1/community/:slug/sub-groups/:subGroupId/sabha/:id/proposals/:proposalId` | `requireAuth`, `requireSubGroupPermission('sabha.manage')` | `src/modules/community/sabha.routes.ts:190` |
| GET | `/api/v1/community/:slug/sub-groups/:subGroupId/sabha/:id/proposals/:proposalId` | `requireAuth`, `requireSubGroupPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:175` |
| PUT | `/api/v1/community/:slug/sub-groups/:subGroupId/sabha/:id/proposals/:proposalId` | `requireAuth`, `requireSubGroupPermission('sabha.manage')` | `src/modules/community/sabha.routes.ts:176` |
| GET | `/api/v1/community/:slug/sub-groups/:subGroupId/sabha/:id/proposals/:proposalId/comments` | `requireAuth`, `requireSubGroupPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:191` |
| POST | `/api/v1/community/:slug/sub-groups/:subGroupId/sabha/:id/proposals/:proposalId/comments` | `requireAuth`, `requireSubGroupPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:192` |
| POST | `/api/v1/community/:slug/sub-groups/:subGroupId/sabha/:id/proposals/:proposalId/vote` | `requireAuth`, `requireSubGroupPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:183` |
| PATCH | `/api/v1/community/:slug/sub-groups/:subGroupId/sabha/:id/status` | `requireAuth`, `requireSubGroupPermission('sabha.manage')` | `src/modules/community/sabha.routes.ts:123` |
| GET | `/api/v1/community/:slug/sub-groups/:subGroupId/sabha/attendance` | `requireAuth`, `requireSubGroupPermission('sabha.manage')` | `src/modules/community/sabha.routes.ts:99` |
| GET | `/api/v1/community/:slug/sub-groups/:subGroupId/sabha/decisions` | `requireAuth`, `requireSubGroupPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:101` |
| GET | `/api/v1/community/:slug/sub-groups/:subGroupId/sabha/decisions/:id` | `requireAuth`, `requireSubGroupPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:102` |
| GET | `/api/v1/community/:slug/sub-groups/:subGroupId/sabha/lookups` | `requireAuth`, `requireSubGroupPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:93` |
| GET | `/api/v1/community/:slug/sub-groups/:subGroupId/sabha/urgent` | `requireAuth`, `requireSubGroupPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:113` |
| POST | `/api/v1/community/:slug/sub-groups/:subGroupId/sabha/urgent` | `requireAuth` | `src/modules/community/sabha.routes.ts:112` |
| GET | `/api/v1/community/:slug/sub-groups/:subGroupId/sabha/urgent/:id` | `requireAuth`, `requireSubGroupPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:114` |
| POST | `/api/v1/community/:slug/sub-groups/:subGroupId/sabha/urgent/:id/consent` | `requireAuth`, `requireSubGroupPermission('sabha.participate')` | `src/modules/community/sabha.routes.ts:115` |
| POST | `/api/v1/community/:slug/sub-groups/:subGroupId/sabha/urgent/:id/promote` | `requireAuth`, `requireSubGroupPermission('sabha.manage')` | `src/modules/community/sabha.routes.ts:116` |
| GET | `/api/v1/community/:slug/sub-groups/lookups` | `requireAuth`, `requireCommunityPermission('subgroup.manage')` | `src/modules/community/sub-group.routes.ts:56` |
| GET | `/api/v1/community/:slug/sub-groups/mine` | `requireAuth` | `src/modules/community/sub-group.routes.ts:66` |
| GET | `/api/v1/community/:slug/work-requests` | `requireAuth`, `requireCommunityPermission('workRequest.use')` | `src/modules/community/work-request.routes.ts:81` |
| POST | `/api/v1/community/:slug/work-requests` | `requireAuth`, `requireCommunityPermission('workRequest.use')` | `src/modules/community/work-request.routes.ts:72` |
| GET | `/api/v1/community/:slug/work-requests/:id` | `requireAuth`, `requireCommunityPermission('workRequest.use')` | `src/modules/community/work-request.routes.ts:90` |
| POST | `/api/v1/community/:slug/work-requests/:id/accept` | `requireAuth`, `requireCommunityPermission('workRequest.use')` | `src/modules/community/work-request.routes.ts:98` |
| POST | `/api/v1/community/:slug/work-requests/:id/rate` | `requireAuth`, `requireCommunityPermission('workRequest.use')` | `src/modules/community/work-request.routes.ts:107` |
| GET | `/api/v1/community/:slug/work-requests/match` | `requireAuth`, `requireCommunityPermission('workRequest.use')` | `src/modules/community/work-request.routes.ts:61` |
| GET | `/api/v1/community/:slug/work-requests/service-needs` | `requireAuth`, `requireCommunityPermission('workRequest.use')` | `src/modules/community/work-request.routes.ts:45` |
| GET | `/api/v1/community/:slug/work-requests/urgency-levels` | `requireAuth`, `requireCommunityPermission('workRequest.use')` | `src/modules/community/work-request.routes.ts:53` |

### `/api/v1/contact` (1)

| Method | Path | Guards | Source |
|---|---|---|---|
| POST | `/api/v1/contact` | public | `src/modules/niwasi/contact.routes.ts:9` |

### `/api/v1/event-host` (23)

| Method | Path | Guards | Source |
|---|---|---|---|
| GET | `/api/v1/event-host/events` | `optionalAuth` | `src/modules/event/event-host.routes.ts:71` |
| GET | `/api/v1/event-host/events/:event_slug/attendance` | `optionalAuth` | `src/modules/event/event-host.routes.ts:138` |
| POST | `/api/v1/event-host/events/:event_slug/attendance` | `optionalAuth` | `src/modules/event/event-host.routes.ts:144` |
| GET | `/api/v1/event-host/events/:event_slug/comments` | `optionalAuth` | `src/modules/event/event-host.routes.ts:171` |
| POST | `/api/v1/event-host/events/:event_slug/comments` | `optionalAuth` | `src/modules/event/event-host.routes.ts:177` |
| DELETE | `/api/v1/event-host/events/:event_slug/comments/:commentId` | `optionalAuth` | `src/modules/event/event-host.routes.ts:187` |
| GET | `/api/v1/event-host/events/:event_slug/dashboard` | `optionalAuth` | `src/modules/event/event-host.routes.ts:74` |
| GET | `/api/v1/event-host/events/:event_slug/feedback` | `optionalAuth` | `src/modules/event/event-host.routes.ts:207` |
| POST | `/api/v1/event-host/events/:event_slug/feedback` | `optionalAuth` | `src/modules/event/event-host.routes.ts:213` |
| POST | `/api/v1/event-host/events/:event_slug/like` | `optionalAuth` | `src/modules/event/event-host.routes.ts:193` |
| GET | `/api/v1/event-host/events/:event_slug/media` | `optionalAuth` | `src/modules/event/event-host.routes.ts:154` |
| GET | `/api/v1/event-host/events/:event_slug/media/:mediaId/file` | `optionalAuth` | `src/modules/event/event-host.routes.ts:160` |
| GET | `/api/v1/event-host/events/:event_slug/project` | `optionalAuth` | `src/modules/event/event-host.routes.ts:228` |
| POST | `/api/v1/event-host/events/:event_slug/project` | `optionalAuth` | `src/modules/event/event-host.routes.ts:234` |
| GET | `/api/v1/event-host/events/:event_slug/project/options` | `optionalAuth` | `src/modules/event/event-host.routes.ts:222` |
| POST | `/api/v1/event-host/events/:event_slug/registration` | `optionalAuth` | `src/modules/event/event-host.routes.ts:83` |
| GET | `/api/v1/event-host/events/:event_slug/registration/me` | `optionalAuth` | `src/modules/event/event-host.routes.ts:92` |
| GET | `/api/v1/event-host/events/:event_slug/registrations` | `optionalAuth` | `src/modules/event/event-host.routes.ts:102` |
| DELETE | `/api/v1/event-host/events/:event_slug/registrations/:regId` | `optionalAuth` | `src/modules/event/event-host.routes.ts:109` |
| GET | `/api/v1/event-host/events/:event_slug/registrations/:regId` | `optionalAuth` | `src/modules/event/event-host.routes.ts:121` |
| PUT | `/api/v1/event-host/events/:event_slug/registrations/:regId` | `optionalAuth` | `src/modules/event/event-host.routes.ts:127` |
| GET | `/api/v1/event-host/events/:event_slug/report` | `optionalAuth` | `src/modules/event/event-host.routes.ts:241` |
| POST | `/api/v1/event-host/events/:event_slug/report` | `optionalAuth` | `src/modules/event/event-host.routes.ts:247` |

### `/api/v1/event` (25)

| Method | Path | Guards | Source |
|---|---|---|---|
| GET | `/api/v1/event/:event_slug/dashboard` | `requireEventPermission('event.view')`, `requireAuth` | `src/modules/event/event.routes.ts:398` |
| GET | `/api/v1/event/:slug/:pctype/eventMaster` | `requireEventPermission('event.master')`, `requireAuth` | `src/modules/event/event.routes.ts:115` |
| POST | `/api/v1/event/:slug/:pctype/eventMaster/:master` | `requireEventPermission('event.master')`, `requireAuth` | `src/modules/event/event.routes.ts:125` |
| PUT | `/api/v1/event/:slug/:pctype/eventMaster/:master/:id` | `requireEventPermission('event.master')`, `requireAuth` | `src/modules/event/event.routes.ts:135` |
| GET | `/api/v1/event/:slug/:pctype/events` | `requireEventPermission('event.view')`, `requireAuth` | `src/modules/event/event.routes.ts:146` |
| POST | `/api/v1/event/:slug/:pctype/events` | `requireEventPermission('event.manage')`, `requireAuth` | `src/modules/event/event.routes.ts:157` |
| DELETE | `/api/v1/event/:slug/:pctype/events/:id` | `requireEventPermission('event.manage')`, `requireAuth` | `src/modules/event/event.routes.ts:198` |
| GET | `/api/v1/event/:slug/:pctype/events/:id` | `requireEventPermission('event.view')`, `requireAuth` | `src/modules/event/event.routes.ts:178` |
| PUT | `/api/v1/event/:slug/:pctype/events/:id` | `requireEventPermission('event.manage')`, `requireAuth` | `src/modules/event/event.routes.ts:188` |
| GET | `/api/v1/event/:slug/:pctype/events/:id/assign` | `requireEventPermission('event.manage')`, `requireAuth` | `src/modules/event/event.routes.ts:218` |
| POST | `/api/v1/event/:slug/:pctype/events/:id/assign` | `requireEventPermission('event.manage')`, `requireAuth` | `src/modules/event/event.routes.ts:249` |
| DELETE | `/api/v1/event/:slug/:pctype/events/:id/assign/:assignId` | `requireEventPermission('event.manage')`, `requireAuth` | `src/modules/event/event.routes.ts:259` |
| GET | `/api/v1/event/:slug/:pctype/events/:id/assign/list` | `requireEventPermission('event.manage')`, `requireAuth` | `src/modules/event/event.routes.ts:239` |
| GET | `/api/v1/event/:slug/:pctype/events/:id/assign/members` | `requireEventPermission('event.manage')`, `requireAuth` | `src/modules/event/event.routes.ts:228` |
| DELETE | `/api/v1/event/:slug/:pctype/events/:id/media` | `requireEventPermission('event.manage')`, `requireAuth` | `src/modules/event/event.routes.ts:322` |
| GET | `/api/v1/event/:slug/:pctype/events/:id/media` | `requireEventPermission('event.manage')`, `requireAuth` | `src/modules/event/event.routes.ts:280` |
| POST | `/api/v1/event/:slug/:pctype/events/:id/media` | `requireEventPermission('event.manage')`, `requireAuth` | `src/modules/event/event.routes.ts:290` |
| DELETE | `/api/v1/event/:slug/:pctype/events/:id/media/:mediaId` | `requireEventPermission('event.manage')`, `requireAuth` | `src/modules/event/event.routes.ts:312` |
| PUT | `/api/v1/event/:slug/:pctype/events/:id/media/:mediaId` | `requireEventPermission('event.manage')`, `requireAuth` | `src/modules/event/event.routes.ts:301` |
| GET | `/api/v1/event/:slug/:pctype/events/:id/report` | `requireEventPermission('event.view')`, `requireAuth` | `src/modules/event/event.routes.ts:342` |
| POST | `/api/v1/event/:slug/:pctype/events/:id/report` | `requireEventPermission('event.manage')`, `requireAuth` | `src/modules/event/event.routes.ts:353` |
| DELETE | `/api/v1/event/:slug/:pctype/events/:id/report/:reportId` | `requireEventPermission('event.manage')`, `requireAuth` | `src/modules/event/event.routes.ts:383` |
| GET | `/api/v1/event/:slug/:pctype/events/:id/report/:reportId` | `requireEventPermission('event.view')`, `requireAuth` | `src/modules/event/event.routes.ts:363` |
| PUT | `/api/v1/event/:slug/:pctype/events/:id/report/:reportId` | `requireEventPermission('event.manage')`, `requireAuth` | `src/modules/event/event.routes.ts:373` |
| POST | `/api/v1/event/:slug/:pctype/events/acceptReject/:id` | `requireEventPermission('event.manage')`, `requireAuth` | `src/modules/event/event.routes.ts:168` |

### `/api/v1/help` (13)

| Method | Path | Guards | Source |
|---|---|---|---|
| GET | `/api/v1/help/admin/lists/donations` | `requireAuth`, `requireSystemAdmin` | `src/modules/help/help.admin.routes.ts:38` |
| GET | `/api/v1/help/admin/lists/help-persons` | `requireAuth`, `requireSystemAdmin` | `src/modules/help/help.admin.routes.ts:41` |
| GET | `/api/v1/help/admin/mails` | `requireAuth`, `requireSystemAdmin` | `src/modules/help/help.admin.routes.ts:44` |
| POST | `/api/v1/help/admin/mails/:id/send` | `requireAuth`, `requireSystemAdmin` | `src/modules/help/help.admin.routes.ts:48` |
| GET | `/api/v1/help/child-report/:slug/:type` | public | `src/modules/help/help.routes.ts:50` |
| GET | `/api/v1/help/dashboard` | `requireAuth` | `src/modules/help/help.routes.ts:53` |
| GET | `/api/v1/help/needy` | public | `src/modules/help/help.routes.ts:33` |
| GET | `/api/v1/help/needy/:id` | public | `src/modules/help/help.routes.ts:43` |
| POST | `/api/v1/help/needy/list` | `requireAuth` | `src/modules/help/help.routes.ts:39` |
| POST | `/api/v1/help/needy/list/other` | public | `src/modules/help/help.routes.ts:41` |
| POST | `/api/v1/help/needy/list/public` | public | `src/modules/help/help.routes.ts:40` |
| GET | `/api/v1/help/requests` | public | `src/modules/help/help.routes.ts:46` |
| GET | `/api/v1/help/requests/:id` | public | `src/modules/help/help.routes.ts:47` |

### `/api/v1/i18n` (1)

| Method | Path | Guards | Source |
|---|---|---|---|
| GET | `/api/v1/i18n/dictionary/:locale` | public | `src/modules/i18n/i18n.routes.ts:10` |

### `/api/v1/locations` (10)

| Method | Path | Guards | Source |
|---|---|---|---|
| GET | `/api/v1/locations/city-blocks` | public | `src/modules/niwasi/location.routes.ts:23` |
| GET | `/api/v1/locations/city-zones` | public | `src/modules/niwasi/location.routes.ts:24` |
| GET | `/api/v1/locations/countries` | public | `src/modules/niwasi/location.routes.ts:20` |
| GET | `/api/v1/locations/districts` | public | `src/modules/niwasi/location.routes.ts:22` |
| GET | `/api/v1/locations/localities` | public | `src/modules/niwasi/location.routes.ts:26` |
| POST | `/api/v1/locations/localities` | public | `src/modules/niwasi/location.routes.ts:30` |
| GET | `/api/v1/locations/states` | public | `src/modules/niwasi/location.routes.ts:21` |
| GET | `/api/v1/locations/sub-localities` | public | `src/modules/niwasi/location.routes.ts:27` |
| POST | `/api/v1/locations/sub-localities` | public | `src/modules/niwasi/location.routes.ts:31` |
| GET | `/api/v1/locations/wards` | public | `src/modules/niwasi/location.routes.ts:25` |

### `/api/v1/partner` (383)

| Method | Path | Guards | Source |
|---|---|---|---|
| GET | `/api/v1/partner/_authcheck` | `requirePartnerAuth` | `src/modules/partner/partner.routes.ts:115` |
| GET | `/api/v1/partner/account/picture` | `requirePartnerAuth` | `src/modules/partner/partner.routes.ts:650` |
| GET | `/api/v1/partner/account/profile` | `requirePartnerAuth` | `src/modules/partner/partner.routes.ts:645` |
| PUT | `/api/v1/partner/account/profile` | `requirePartnerAuth` | `src/modules/partner/partner.routes.ts:651` |
| POST | `/api/v1/partner/auth/change-password` | `requirePartnerAuth` | `src/modules/partner/partner.routes.ts:658` |
| POST | `/api/v1/partner/auth/login` | public | `src/modules/partner/partner.routes.ts:127` |
| POST | `/api/v1/partner/auth/logout` | public | `src/modules/partner/partner.routes.ts:128` |
| GET | `/api/v1/partner/auth/me` | `requirePartnerAuth` | `src/modules/partner/partner.routes.ts:132` |
| POST | `/api/v1/partner/auth/signup` | public | `src/modules/partner/partner.routes.ts:126` |
| GET | `/api/v1/partner/dashboard` | `requirePartnerAuth`, `requirePartnerPermission('main.dashboard')` | `src/modules/partner/partner.routes.ts:136` |
| POST | `/api/v1/partner/default-org` | `requirePartnerAuth` | `src/modules/partner/partner.routes.ts:661` |
| GET | `/api/v1/partner/masters/category-of-entity` | `requirePartnerAuth`, `requirePartnerPermission('platform.master')` | `src/modules/partner/partner.routes.ts:719` |
| POST | `/api/v1/partner/masters/category-of-entity` | `requirePartnerAuth`, `requirePartnerPermission('platform.master')` | `src/modules/partner/partner.routes.ts:724` |
| DELETE | `/api/v1/partner/masters/category-of-entity/:id` | `requirePartnerAuth`, `requirePartnerPermission('platform.master')` | `src/modules/partner/partner.routes.ts:734` |
| PUT | `/api/v1/partner/masters/category-of-entity/:id` | `requirePartnerAuth`, `requirePartnerPermission('platform.master')` | `src/modules/partner/partner.routes.ts:729` |
| PATCH | `/api/v1/partner/masters/category-of-entity/:id/status` | `requirePartnerAuth`, `requirePartnerPermission('platform.master')` | `src/modules/partner/partner.routes.ts:740` |
| GET | `/api/v1/partner/masters/report-category` | `requirePartnerAuth`, `requirePartnerPermission('platform.master')` | `src/modules/partner/partner.routes.ts:746` |
| POST | `/api/v1/partner/masters/report-category` | `requirePartnerAuth`, `requirePartnerPermission('platform.master')` | `src/modules/partner/partner.routes.ts:751` |
| DELETE | `/api/v1/partner/masters/report-category/:id` | `requirePartnerAuth`, `requirePartnerPermission('platform.master')` | `src/modules/partner/partner.routes.ts:761` |
| PUT | `/api/v1/partner/masters/report-category/:id` | `requirePartnerAuth`, `requirePartnerPermission('platform.master')` | `src/modules/partner/partner.routes.ts:756` |
| PATCH | `/api/v1/partner/masters/report-category/:id/status` | `requirePartnerAuth`, `requirePartnerPermission('platform.master')` | `src/modules/partner/partner.routes.ts:767` |
| GET | `/api/v1/partner/my-orgs` | `requirePartnerAuth` | `src/modules/partner/partner.routes.ts:157` |
| GET | `/api/v1/partner/nature-types` | `requirePartnerAuth`, `requirePartnerPermission('partner.org.manage')` | `src/modules/partner/partner.routes.ts:699` |
| GET | `/api/v1/partner/orgs` | public | `src/modules/partner/partner.routes.ts:120` |
| POST | `/api/v1/partner/orgs/:slug/affiliator/mark/:uprId` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/affiliator.routes.ts:41` |
| GET | `/api/v1/partner/orgs/:slug/affiliator/niwasi` | `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/affiliator.routes.ts:69` |
| GET | `/api/v1/partner/orgs/:slug/affiliator/service-requests` | `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/affiliator.routes.ts:50` |
| POST | `/api/v1/partner/orgs/:slug/affiliator/service-requests` | `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/affiliator.routes.ts:89` |
| GET | `/api/v1/partner/orgs/:slug/affiliator/service-requests/:id` | `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/affiliator.routes.ts:108` |
| POST | `/api/v1/partner/orgs/:slug/affiliator/service-requests/:id/ask-interest` | `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/affiliator.routes.ts:117` |
| GET | `/api/v1/partner/orgs/:slug/affiliator/service-requests/options` | `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/affiliator.routes.ts:60` |
| POST | `/api/v1/partner/orgs/:slug/affiliator/service-requests/wrsp/:wrspId/assign` | `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/affiliator.routes.ts:99` |
| GET | `/api/v1/partner/orgs/:slug/affiliator/sub-services` | `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/affiliator.routes.ts:79` |
| DELETE | `/api/v1/partner/orgs/:slug/banner-campaigns/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('iec.campaign')` | `src/modules/partner/banner-campaign.routes.ts:25` |
| GET | `/api/v1/partner/orgs/:slug/banner-campaigns/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('iec.campaign')` | `src/modules/partner/banner-campaign.routes.ts:23` |
| PUT | `/api/v1/partner/orgs/:slug/banner-campaigns/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('iec.campaign')` | `src/modules/partner/banner-campaign.routes.ts:24` |
| GET | `/api/v1/partner/orgs/:slug/banner-campaigns/options` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('iec.campaign')` | `src/modules/partner/banner-campaign.routes.ts:21` |
| DELETE | `/api/v1/partner/orgs/:slug/batches/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('facility.business')` | `src/modules/partner/facility-batch.routes.ts:83` |
| GET | `/api/v1/partner/orgs/:slug/batches/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('facility.business')` | `src/modules/partner/facility-batch.routes.ts:66` |
| PUT | `/api/v1/partner/orgs/:slug/batches/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('facility.business')` | `src/modules/partner/facility-batch.routes.ts:74` |
| GET | `/api/v1/partner/orgs/:slug/batches/:id/facilities` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('facility.business')` | `src/modules/partner/facility-batch.routes.ts:103` |
| POST | `/api/v1/partner/orgs/:slug/batches/:id/facilities` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('facility.business')` | `src/modules/partner/facility-batch.routes.ts:111` |
| DELETE | `/api/v1/partner/orgs/:slug/batches/:id/facilities/:facilityBusinessId` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('facility.business')` | `src/modules/partner/facility-batch.routes.ts:120` |
| PATCH | `/api/v1/partner/orgs/:slug/batches/:id/status` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('facility.business')` | `src/modules/partner/facility-batch.routes.ts:92` |
| GET | `/api/v1/partner/orgs/:slug/batches/options` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('facility.business')` | `src/modules/partner/facility-batch.routes.ts:48` |
| GET | `/api/v1/partner/orgs/:slug/communities` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:331` |
| POST | `/api/v1/partner/orgs/:slug/communities` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:347` |
| GET | `/api/v1/partner/orgs/:slug/communities/:communityId/staff` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:385` |
| POST | `/api/v1/partner/orgs/:slug/communities/:communityId/staff` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:392` |
| DELETE | `/api/v1/partner/orgs/:slug/communities/:communityId/staff/:userId` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:400` |
| DELETE | `/api/v1/partner/orgs/:slug/communities/:pcId` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:362` |
| POST | `/api/v1/partner/orgs/:slug/communities/:pcId/consider` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:355` |
| POST | `/api/v1/partner/orgs/:slug/communities/:pcId/reactivate` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:369` |
| GET | `/api/v1/partner/orgs/:slug/communities/available` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:339` |
| GET | `/api/v1/partner/orgs/:slug/contacts/activity-summary` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/iec-contact.routes.ts:47` |
| GET | `/api/v1/partner/orgs/:slug/contacts/assigned-interaction` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/contacts-extras.routes.ts:47` |
| GET | `/api/v1/partner/orgs/:slug/contacts/export` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/contacts-extras.routes.ts:57` |
| POST | `/api/v1/partner/orgs/:slug/contacts/import` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/contacts-extras.routes.ts:54` |
| GET | `/api/v1/partner/orgs/:slug/contacts/interaction` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/contacts-extras.routes.ts:43` |
| POST | `/api/v1/partner/orgs/:slug/contacts/interaction` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/contacts-extras.routes.ts:42` |
| GET | `/api/v1/partner/orgs/:slug/contacts/interaction/:id` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/contacts-extras.routes.ts:44` |
| GET | `/api/v1/partner/orgs/:slug/contacts/label-types` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/iec-contact.routes.ts:45` |
| GET | `/api/v1/partner/orgs/:slug/contacts/options` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/iec-contact.routes.ts:46` |
| GET | `/api/v1/partner/orgs/:slug/contacts/organisations` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/iec-contact.routes.ts:78` |
| POST | `/api/v1/partner/orgs/:slug/contacts/organisations` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/iec-contact.routes.ts:79` |
| DELETE | `/api/v1/partner/orgs/:slug/contacts/organisations/:id` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/iec-contact.routes.ts:82` |
| GET | `/api/v1/partner/orgs/:slug/contacts/organisations/:id` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/iec-contact.routes.ts:80` |
| PUT | `/api/v1/partner/orgs/:slug/contacts/organisations/:id` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/iec-contact.routes.ts:81` |
| GET | `/api/v1/partner/orgs/:slug/contacts/organisations/:id/labels` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/iec-contact.routes.ts:85` |
| POST | `/api/v1/partner/orgs/:slug/contacts/organisations/:id/labels` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/iec-contact.routes.ts:86` |
| DELETE | `/api/v1/partner/orgs/:slug/contacts/organisations/:id/labels/:subId` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/iec-contact.routes.ts:87` |
| GET | `/api/v1/partner/orgs/:slug/contacts/persons` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/iec-contact.routes.ts:50` |
| POST | `/api/v1/partner/orgs/:slug/contacts/persons` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/iec-contact.routes.ts:51` |
| DELETE | `/api/v1/partner/orgs/:slug/contacts/persons/:id` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/iec-contact.routes.ts:54` |
| GET | `/api/v1/partner/orgs/:slug/contacts/persons/:id` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/iec-contact.routes.ts:52` |
| PUT | `/api/v1/partner/orgs/:slug/contacts/persons/:id` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/iec-contact.routes.ts:53` |
| POST | `/api/v1/partner/orgs/:slug/contacts/persons/:id/belong-to-community` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/iec-contact.routes.ts:75` |
| POST | `/api/v1/partner/orgs/:slug/contacts/persons/:id/belong-to-group` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/iec-contact.routes.ts:73` |
| GET | `/api/v1/partner/orgs/:slug/contacts/persons/:id/history` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/iec-contact.routes.ts:67` |
| POST | `/api/v1/partner/orgs/:slug/contacts/persons/:id/history` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/iec-contact.routes.ts:68` |
| GET | `/api/v1/partner/orgs/:slug/contacts/persons/:id/hobbies` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/iec-contact.routes.ts:71` |
| POST | `/api/v1/partner/orgs/:slug/contacts/persons/:id/hobbies` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/iec-contact.routes.ts:72` |
| GET | `/api/v1/partner/orgs/:slug/contacts/persons/:id/labels` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/iec-contact.routes.ts:57` |
| POST | `/api/v1/partner/orgs/:slug/contacts/persons/:id/labels` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/iec-contact.routes.ts:58` |
| DELETE | `/api/v1/partner/orgs/:slug/contacts/persons/:id/labels/:subId` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/iec-contact.routes.ts:59` |
| POST | `/api/v1/partner/orgs/:slug/contacts/persons/:id/make-user` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/iec-contact.routes.ts:74` |
| GET | `/api/v1/partner/orgs/:slug/contacts/persons/:id/related-tos` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/iec-contact.routes.ts:62` |
| POST | `/api/v1/partner/orgs/:slug/contacts/persons/:id/related-tos` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/iec-contact.routes.ts:63` |
| DELETE | `/api/v1/partner/orgs/:slug/contacts/persons/:id/related-tos/:subId` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/iec-contact.routes.ts:64` |
| POST | `/api/v1/partner/orgs/:slug/contacts/sync` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/contacts-extras.routes.ts:60` |
| GET | `/api/v1/partner/orgs/:slug/contacts/today` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/contacts-extras.routes.ts:51` |
| POST | `/api/v1/partner/orgs/:slug/contacts/today/schedule` | `requirePartnerPermission('iec.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/contacts-extras.routes.ts:50` |
| GET | `/api/v1/partner/orgs/:slug/dashboard` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:148` |
| GET | `/api/v1/partner/orgs/:slug/designations` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:192` |
| POST | `/api/v1/partner/orgs/:slug/designations` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:200` |
| DELETE | `/api/v1/partner/orgs/:slug/designations/:id` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:223` |
| GET | `/api/v1/partner/orgs/:slug/designations/:id` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:208` |
| PUT | `/api/v1/partner/orgs/:slug/designations/:id` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:215` |
| PATCH | `/api/v1/partner/orgs/:slug/designations/:id/status` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:231` |
| DELETE | `/api/v1/partner/orgs/:slug/facilities/:facilityId/communities/:communityId` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('facility.business')` | `src/modules/partner/facility-assignment.routes.ts:56` |
| DELETE | `/api/v1/partner/orgs/:slug/facilities/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('facility.business')` | `src/modules/partner/facility-business.routes.ts:128` |
| PUT | `/api/v1/partner/orgs/:slug/facilities/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('facility.business')` | `src/modules/partner/facility-business.routes.ts:117` |
| GET | `/api/v1/partner/orgs/:slug/facilities/:idOrSlug` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('facility.business')` | `src/modules/partner/facility-business.routes.ts:107` |
| GET | `/api/v1/partner/orgs/:slug/facilities/dashboard` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('facility.business')` | `src/modules/partner/facility-business.routes.ts:65` |
| GET | `/api/v1/partner/orgs/:slug/facilities/export` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('facility.reports')` | `src/modules/partner/facility-business.routes.ts:75` |
| GET | `/api/v1/partner/orgs/:slug/facilities/options` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('facility.business')` | `src/modules/partner/facility-business.routes.ts:45` |
| GET | `/api/v1/partner/orgs/:slug/facilities/options/geo` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('facility.business')` | `src/modules/partner/facility-business.routes.ts:54` |
| DELETE | `/api/v1/partner/orgs/:slug/facility-assignments/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('facility.business')` | `src/modules/partner/facility-assignment.routes.ts:86` |
| DELETE | `/api/v1/partner/orgs/:slug/iec-campaigns/:type/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('iec.campaign')` | `src/modules/partner/iec-campaign.routes.ts:98` |
| GET | `/api/v1/partner/orgs/:slug/iec-campaigns/:type/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('iec.campaign')` | `src/modules/partner/iec-campaign.routes.ts:81` |
| PUT | `/api/v1/partner/orgs/:slug/iec-campaigns/:type/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('iec.campaign')` | `src/modules/partner/iec-campaign.routes.ts:89` |
| GET | `/api/v1/partner/orgs/:slug/iec-campaigns/:type/options` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('iec.campaign')` | `src/modules/partner/iec-campaign.routes.ts:64` |
| GET | `/api/v1/partner/orgs/:slug/iec-campaigns/activity-summary` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('iec.contact')` | `src/modules/partner/iec-campaign.routes.ts:45` |
| DELETE | `/api/v1/partner/orgs/:slug/master/nala/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('master.nala')` | `src/modules/partner/nala-master.routes.ts:75` |
| GET | `/api/v1/partner/orgs/:slug/master/nala/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('master.nala')` | `src/modules/partner/nala-master.routes.ts:58` |
| PUT | `/api/v1/partner/orgs/:slug/master/nala/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('master.nala')` | `src/modules/partner/nala-master.routes.ts:66` |
| PATCH | `/api/v1/partner/orgs/:slug/master/nala/:id/status` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('master.nala')` | `src/modules/partner/nala-master.routes.ts:84` |
| GET | `/api/v1/partner/orgs/:slug/master/nala/options` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('master.nala')` | `src/modules/partner/nala-master.routes.ts:40` |
| GET | `/api/v1/partner/orgs/:slug/masters/activity-category` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:555` |
| POST | `/api/v1/partner/orgs/:slug/masters/activity-category` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:570` |
| DELETE | `/api/v1/partner/orgs/:slug/masters/activity-category/:id` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:586` |
| PUT | `/api/v1/partner/orgs/:slug/masters/activity-category/:id` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:578` |
| PATCH | `/api/v1/partner/orgs/:slug/masters/activity-category/:id/status` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:594` |
| GET | `/api/v1/partner/orgs/:slug/masters/activity-category/project-options` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:563` |
| POST | `/api/v1/partner/orgs/:slug/order-placement/attachments` | `requirePartnerAuth`, `requireOrgStaffOnly` | `src/modules/partner/order-placement.routes.ts:67` |
| GET | `/api/v1/partner/orgs/:slug/order-placement/attachments/:filename` | `requirePartnerAuth`, `requireOrgStaffOnly` | `src/modules/partner/order-placement.routes.ts:68` |
| GET | `/api/v1/partner/orgs/:slug/order-placement/customers` | `requirePartnerAuth`, `requireOrgStaffOnly` | `src/modules/partner/order-placement.routes.ts:71` |
| POST | `/api/v1/partner/orgs/:slug/order-placement/customers` | `requirePartnerAuth`, `requireOrgStaffOnly` | `src/modules/partner/order-placement.routes.ts:73` |
| GET | `/api/v1/partner/orgs/:slug/order-placement/customers/:id` | `requirePartnerAuth`, `requireOrgStaffOnly` | `src/modules/partner/order-placement.routes.ts:74` |
| PUT | `/api/v1/partner/orgs/:slug/order-placement/customers/:id` | `requirePartnerAuth`, `requireOrgStaffOnly` | `src/modules/partner/order-placement.routes.ts:75` |
| POST | `/api/v1/partner/orgs/:slug/order-placement/customers/:id/members` | `requirePartnerAuth`, `requireOrgStaffOnly` | `src/modules/partner/order-placement.routes.ts:77` |
| GET | `/api/v1/partner/orgs/:slug/order-placement/customers/:id/orders` | `requirePartnerAuth`, `requireOrgStaffOnly` | `src/modules/partner/order-placement.routes.ts:76` |
| GET | `/api/v1/partner/orgs/:slug/order-placement/customers/lookup` | `requirePartnerAuth`, `requireOrgStaffOnly` | `src/modules/partner/order-placement.routes.ts:72` |
| GET | `/api/v1/partner/orgs/:slug/order-placement/dashboard` | `requirePartnerAuth`, `requireOrgStaffOnly` | `src/modules/partner/order-placement.routes.ts:64` |
| GET | `/api/v1/partner/orgs/:slug/order-placement/masters/categories` | `requirePartnerAuth`, `requireOrgStaffOnly` | `src/modules/partner/order-placement.routes.ts:99` |
| POST | `/api/v1/partner/orgs/:slug/order-placement/masters/categories` | `requirePartnerAuth`, `requireOrgStaffOnly` | `src/modules/partner/order-placement.routes.ts:100` |
| PUT | `/api/v1/partner/orgs/:slug/order-placement/masters/categories/:id` | `requirePartnerAuth`, `requireOrgStaffOnly` | `src/modules/partner/order-placement.routes.ts:101` |
| PATCH | `/api/v1/partner/orgs/:slug/order-placement/masters/categories/:id/status` | `requirePartnerAuth`, `requireOrgStaffOnly` | `src/modules/partner/order-placement.routes.ts:102` |
| POST | `/api/v1/partner/orgs/:slug/order-placement/masters/categories/ensure` | `requirePartnerAuth`, `requireOrgStaffOnly` | `src/modules/partner/order-placement.routes.ts:89` |
| GET | `/api/v1/partner/orgs/:slug/order-placement/masters/groups` | `requirePartnerAuth`, `requireOrgStaffOnly` | `src/modules/partner/order-placement.routes.ts:93` |
| POST | `/api/v1/partner/orgs/:slug/order-placement/masters/groups` | `requirePartnerAuth`, `requireOrgStaffOnly` | `src/modules/partner/order-placement.routes.ts:94` |
| PUT | `/api/v1/partner/orgs/:slug/order-placement/masters/groups/:id` | `requirePartnerAuth`, `requireOrgStaffOnly` | `src/modules/partner/order-placement.routes.ts:95` |
| PATCH | `/api/v1/partner/orgs/:slug/order-placement/masters/groups/:id/status` | `requirePartnerAuth`, `requireOrgStaffOnly` | `src/modules/partner/order-placement.routes.ts:96` |
| GET | `/api/v1/partner/orgs/:slug/order-placement/masters/items` | `requirePartnerAuth`, `requireOrgStaffOnly` | `src/modules/partner/order-placement.routes.ts:105` |
| POST | `/api/v1/partner/orgs/:slug/order-placement/masters/items` | `requirePartnerAuth`, `requireOrgStaffOnly` | `src/modules/partner/order-placement.routes.ts:106` |
| PUT | `/api/v1/partner/orgs/:slug/order-placement/masters/items/:id` | `requirePartnerAuth`, `requireOrgStaffOnly` | `src/modules/partner/order-placement.routes.ts:108` |
| GET | `/api/v1/partner/orgs/:slug/order-placement/masters/items/:id/rate-history` | `requirePartnerAuth`, `requireOrgStaffOnly` | `src/modules/partner/order-placement.routes.ts:107` |
| PATCH | `/api/v1/partner/orgs/:slug/order-placement/masters/items/:id/status` | `requirePartnerAuth`, `requireOrgStaffOnly` | `src/modules/partner/order-placement.routes.ts:109` |
| POST | `/api/v1/partner/orgs/:slug/order-placement/masters/items/ensure` | `requirePartnerAuth`, `requireOrgStaffOnly` | `src/modules/partner/order-placement.routes.ts:90` |
| GET | `/api/v1/partner/orgs/:slug/order-placement/masters/options/categories` | `requirePartnerAuth`, `requireOrgStaffOnly` | `src/modules/partner/order-placement.routes.ts:87` |
| GET | `/api/v1/partner/orgs/:slug/order-placement/masters/options/items` | `requirePartnerAuth`, `requireOrgStaffOnly` | `src/modules/partner/order-placement.routes.ts:88` |
| GET | `/api/v1/partner/orgs/:slug/order-placement/orders` | `requirePartnerAuth`, `requireOrgStaffOnly` | `src/modules/partner/order-placement.routes.ts:81` |
| POST | `/api/v1/partner/orgs/:slug/order-placement/orders` | `requirePartnerAuth`, `requireOrgStaffOnly` | `src/modules/partner/order-placement.routes.ts:80` |
| GET | `/api/v1/partner/orgs/:slug/order-placement/orders/:group/:id` | `requirePartnerAuth`, `requireOrgStaffOnly` | `src/modules/partner/order-placement.routes.ts:82` |
| PUT | `/api/v1/partner/orgs/:slug/order-placement/orders/:group/:id` | `requirePartnerAuth`, `requireOrgStaffOnly` | `src/modules/partner/order-placement.routes.ts:83` |
| PATCH | `/api/v1/partner/orgs/:slug/order-placement/orders/:group/:id/status` | `requirePartnerAuth`, `requireOrgStaffOnly` | `src/modules/partner/order-placement.routes.ts:84` |
| POST | `/api/v1/partner/orgs/:slug/pratham/assign-project` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:76` |
| GET | `/api/v1/partner/orgs/:slug/pratham/assign-role` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:155` |
| POST | `/api/v1/partner/orgs/:slug/pratham/assign-role/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:156` |
| GET | `/api/v1/partner/orgs/:slug/pratham/cim-clfs` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:109` |
| POST | `/api/v1/partner/orgs/:slug/pratham/cim-clfs` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:111` |
| DELETE | `/api/v1/partner/orgs/:slug/pratham/cim-clfs/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:114` |
| GET | `/api/v1/partner/orgs/:slug/pratham/cim-clfs/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:112` |
| PUT | `/api/v1/partner/orgs/:slug/pratham/cim-clfs/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:113` |
| GET | `/api/v1/partner/orgs/:slug/pratham/cim-clfs/options` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:110` |
| GET | `/api/v1/partner/orgs/:slug/pratham/cims` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:79` |
| DELETE | `/api/v1/partner/orgs/:slug/pratham/cims/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:82` |
| GET | `/api/v1/partner/orgs/:slug/pratham/cims/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:80` |
| PUT | `/api/v1/partner/orgs/:slug/pratham/cims/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:81` |
| GET | `/api/v1/partner/orgs/:slug/pratham/clfs` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:85` |
| POST | `/api/v1/partner/orgs/:slug/pratham/clfs` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:87` |
| DELETE | `/api/v1/partner/orgs/:slug/pratham/clfs/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:90` |
| GET | `/api/v1/partner/orgs/:slug/pratham/clfs/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:88` |
| PUT | `/api/v1/partner/orgs/:slug/pratham/clfs/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:89` |
| GET | `/api/v1/partner/orgs/:slug/pratham/clfs/options` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:86` |
| GET | `/api/v1/partner/orgs/:slug/pratham/cm-vos` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:117` |
| POST | `/api/v1/partner/orgs/:slug/pratham/cm-vos` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:119` |
| DELETE | `/api/v1/partner/orgs/:slug/pratham/cm-vos/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:122` |
| GET | `/api/v1/partner/orgs/:slug/pratham/cm-vos/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:120` |
| PUT | `/api/v1/partner/orgs/:slug/pratham/cm-vos/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:121` |
| GET | `/api/v1/partner/orgs/:slug/pratham/cm-vos/options` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:118` |
| GET | `/api/v1/partner/orgs/:slug/pratham/cms` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:93` |
| DELETE | `/api/v1/partner/orgs/:slug/pratham/cms/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:97` |
| GET | `/api/v1/partner/orgs/:slug/pratham/cms/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:95` |
| PUT | `/api/v1/partner/orgs/:slug/pratham/cms/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:96` |
| GET | `/api/v1/partner/orgs/:slug/pratham/cms/options` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:94` |
| GET | `/api/v1/partner/orgs/:slug/pratham/dashboard` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:74` |
| GET | `/api/v1/partner/orgs/:slug/pratham/export/:type` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:154` |
| POST | `/api/v1/partner/orgs/:slug/pratham/import/:type` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:157` |
| GET | `/api/v1/partner/orgs/:slug/pratham/partner-projects` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:75` |
| GET | `/api/v1/partner/orgs/:slug/pratham/reports/cm-options` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:125` |
| GET | `/api/v1/partner/orgs/:slug/pratham/reports/report1` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:136` |
| POST | `/api/v1/partner/orgs/:slug/pratham/reports/report1` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:138` |
| DELETE | `/api/v1/partner/orgs/:slug/pratham/reports/report1/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:141` |
| GET | `/api/v1/partner/orgs/:slug/pratham/reports/report1/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:139` |
| PUT | `/api/v1/partner/orgs/:slug/pratham/reports/report1/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:140` |
| GET | `/api/v1/partner/orgs/:slug/pratham/reports/report1/options` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:137` |
| GET | `/api/v1/partner/orgs/:slug/pratham/reports/report2` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:145` |
| POST | `/api/v1/partner/orgs/:slug/pratham/reports/report2` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:147` |
| DELETE | `/api/v1/partner/orgs/:slug/pratham/reports/report2/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:151` |
| GET | `/api/v1/partner/orgs/:slug/pratham/reports/report2/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:150` |
| GET | `/api/v1/partner/orgs/:slug/pratham/reports/report2/options` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:146` |
| GET | `/api/v1/partner/orgs/:slug/pratham/reports/report2/r2q1/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:148` |
| PUT | `/api/v1/partner/orgs/:slug/pratham/reports/report2/r2q1/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:149` |
| GET | `/api/v1/partner/orgs/:slug/pratham/reports/report3` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:128` |
| POST | `/api/v1/partner/orgs/:slug/pratham/reports/report3` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:130` |
| DELETE | `/api/v1/partner/orgs/:slug/pratham/reports/report3/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:133` |
| GET | `/api/v1/partner/orgs/:slug/pratham/reports/report3/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:131` |
| PUT | `/api/v1/partner/orgs/:slug/pratham/reports/report3/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:132` |
| GET | `/api/v1/partner/orgs/:slug/pratham/reports/report3/options` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:129` |
| GET | `/api/v1/partner/orgs/:slug/pratham/vos` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:100` |
| POST | `/api/v1/partner/orgs/:slug/pratham/vos` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:103` |
| DELETE | `/api/v1/partner/orgs/:slug/pratham/vos/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:106` |
| GET | `/api/v1/partner/orgs/:slug/pratham/vos/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:104` |
| PUT | `/api/v1/partner/orgs/:slug/pratham/vos/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:105` |
| GET | `/api/v1/partner/orgs/:slug/pratham/vos/community-options` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:102` |
| GET | `/api/v1/partner/orgs/:slug/pratham/vos/options` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('pratham.access')` | `src/modules/partner/pratham.routes.ts:101` |
| GET | `/api/v1/partner/orgs/:slug/profile` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:613` |
| PUT | `/api/v1/partner/orgs/:slug/profile` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:620` |
| POST | `/api/v1/partner/orgs/:slug/profile/sub-services` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:629` |
| GET | `/api/v1/partner/orgs/:slug/projects` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:448` |
| POST | `/api/v1/partner/orgs/:slug/projects` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:463` |
| DELETE | `/api/v1/partner/orgs/:slug/projects/:ppId` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:486` |
| GET | `/api/v1/partner/orgs/:slug/projects/:ppId` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:471` |
| PUT | `/api/v1/partner/orgs/:slug/projects/:ppId` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:478` |
| POST | `/api/v1/partner/orgs/:slug/projects/:projectId/reports` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:506` |
| POST | `/api/v1/partner/orgs/:slug/projects/:projectId/share` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:497` |
| GET | `/api/v1/partner/orgs/:slug/projects/share-targets` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:456` |
| GET | `/api/v1/partner/orgs/:slug/reports/campaigner` | `requirePartnerPermission('reports.view')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/campaigner-report.routes.ts:33` |
| POST | `/api/v1/partner/orgs/:slug/reports/campaigner` | `requirePartnerPermission('reports.view')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/campaigner-report.routes.ts:34` |
| DELETE | `/api/v1/partner/orgs/:slug/reports/campaigner/:id` | `requirePartnerPermission('reports.view')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/campaigner-report.routes.ts:37` |
| GET | `/api/v1/partner/orgs/:slug/reports/campaigner/:id` | `requirePartnerPermission('reports.view')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/campaigner-report.routes.ts:35` |
| PUT | `/api/v1/partner/orgs/:slug/reports/campaigner/:id` | `requirePartnerPermission('reports.view')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/campaigner-report.routes.ts:36` |
| GET | `/api/v1/partner/orgs/:slug/reports/campaigner/options` | `requirePartnerPermission('reports.view')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/campaigner-report.routes.ts:30` |
| GET | `/api/v1/partner/orgs/:slug/reports/cpc/:masterReport` | `requireOrgMember`, `requirePartnerAuth` | `src/modules/partner/cpc-report.routes.ts:48` |
| POST | `/api/v1/partner/orgs/:slug/reports/cpc/:masterReport` | `requireOrgMember`, `requirePartnerAuth` | `src/modules/partner/cpc-report.routes.ts:51` |
| DELETE | `/api/v1/partner/orgs/:slug/reports/cpc/:masterReport/:id` | `requireOrgMember`, `requirePartnerAuth` | `src/modules/partner/cpc-report.routes.ts:64` |
| GET | `/api/v1/partner/orgs/:slug/reports/cpc/:masterReport/:id` | `requireOrgMember`, `requirePartnerAuth` | `src/modules/partner/cpc-report.routes.ts:58` |
| PUT | `/api/v1/partner/orgs/:slug/reports/cpc/:masterReport/:id` | `requireOrgMember`, `requirePartnerAuth` | `src/modules/partner/cpc-report.routes.ts:61` |
| GET | `/api/v1/partner/orgs/:slug/reports/cpc/:masterReport/:id/download` | `requireOrgMember`, `requirePartnerAuth` | `src/modules/partner/cpc-report.routes.ts:55` |
| GET | `/api/v1/partner/orgs/:slug/reports/cpc/:masterReport/community-options` | `requireOrgMember`, `requirePartnerAuth` | `src/modules/partner/cpc-report.routes.ts:45` |
| GET | `/api/v1/partner/orgs/:slug/reports/cpc/master-reports` | `requireOrgMember`, `requirePartnerAuth` | `src/modules/partner/cpc-report.routes.ts:42` |
| DELETE | `/api/v1/partner/orgs/:slug/reports/global/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('reports.view')` | `src/modules/partner/global-report.routes.ts:97` |
| GET | `/api/v1/partner/orgs/:slug/reports/global/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('reports.view')` | `src/modules/partner/global-report.routes.ts:79` |
| PUT | `/api/v1/partner/orgs/:slug/reports/global/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('reports.view')` | `src/modules/partner/global-report.routes.ts:87` |
| GET | `/api/v1/partner/orgs/:slug/reports/global/options` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('reports.view')` | `src/modules/partner/global-report.routes.ts:51` |
| GET | `/api/v1/partner/orgs/:slug/reports/menu` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('reports.view')` | `src/modules/partner/reports-menu.routes.ts:24` |
| GET | `/api/v1/partner/orgs/:slug/reports/my-panchayat` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('reports.view')` | `src/modules/partner/my-panchayat-report.routes.ts:24` |
| POST | `/api/v1/partner/orgs/:slug/reports/my-panchayat` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('reports.view')` | `src/modules/partner/my-panchayat-report.routes.ts:25` |
| DELETE | `/api/v1/partner/orgs/:slug/reports/proposed-campaigner/:id` | `requireOrgMember`, `requirePartnerPermission('reports.view')`, `requirePartnerAuth` | `src/modules/partner/proposed-reports.routes.ts:96` |
| GET | `/api/v1/partner/orgs/:slug/reports/proposed-campaigner/:id` | `requireOrgMember`, `requirePartnerPermission('reports.view')`, `requirePartnerAuth` | `src/modules/partner/proposed-reports.routes.ts:95` |
| GET | `/api/v1/partner/orgs/:slug/reports/proposed-community-options` | `requireOrgMember`, `requirePartnerPermission('reports.view')`, `requirePartnerAuth` | `src/modules/partner/proposed-reports.routes.ts:41` |
| DELETE | `/api/v1/partner/orgs/:slug/reports/proposed-followup/:id` | `requireOrgMember`, `requirePartnerPermission('reports.view')`, `requirePartnerAuth` | `src/modules/partner/proposed-reports.routes.ts:78` |
| GET | `/api/v1/partner/orgs/:slug/reports/proposed-followup/:id` | `requireOrgMember`, `requirePartnerPermission('reports.view')`, `requirePartnerAuth` | `src/modules/partner/proposed-reports.routes.ts:76` |
| PUT | `/api/v1/partner/orgs/:slug/reports/proposed-followup/:id` | `requireOrgMember`, `requirePartnerPermission('reports.view')`, `requirePartnerAuth` | `src/modules/partner/proposed-reports.routes.ts:77` |
| DELETE | `/api/v1/partner/orgs/:slug/reports/proposed-ns/:id` | `requireOrgMember`, `requirePartnerPermission('reports.view')`, `requirePartnerAuth` | `src/modules/partner/proposed-reports.routes.ts:58` |
| GET | `/api/v1/partner/orgs/:slug/reports/proposed-ns/:id` | `requireOrgMember`, `requirePartnerPermission('reports.view')`, `requirePartnerAuth` | `src/modules/partner/proposed-reports.routes.ts:56` |
| PUT | `/api/v1/partner/orgs/:slug/reports/proposed-ns/:id` | `requireOrgMember`, `requirePartnerPermission('reports.view')`, `requirePartnerAuth` | `src/modules/partner/proposed-reports.routes.ts:57` |
| DELETE | `/api/v1/partner/orgs/:slug/reports/proposed-swachhata/:id` | `requireOrgMember`, `requirePartnerPermission('reports.view')`, `requirePartnerAuth` | `src/modules/partner/proposed-reports.routes.ts:68` |
| GET | `/api/v1/partner/orgs/:slug/reports/proposed-swachhata/:id` | `requireOrgMember`, `requirePartnerPermission('reports.view')`, `requirePartnerAuth` | `src/modules/partner/proposed-reports.routes.ts:66` |
| PUT | `/api/v1/partner/orgs/:slug/reports/proposed-swachhata/:id` | `requireOrgMember`, `requirePartnerPermission('reports.view')`, `requirePartnerAuth` | `src/modules/partner/proposed-reports.routes.ts:67` |
| GET | `/api/v1/partner/orgs/:slug/samajik-udyami/dashboard` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('samajik.udyami')` | `src/modules/partner/samajik-udyami.routes.ts:39` |
| GET | `/api/v1/partner/orgs/:slug/samajik-udyami/ham-niwasi-reports` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('samajik.udyami')` | `src/modules/partner/samajik-udyami.routes.ts:94` |
| POST | `/api/v1/partner/orgs/:slug/samajik-udyami/ham-niwasi-reports` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('samajik.udyami')` | `src/modules/partner/samajik-udyami.routes.ts:103` |
| DELETE | `/api/v1/partner/orgs/:slug/samajik-udyami/ham-niwasi-reports/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('samajik.udyami')` | `src/modules/partner/samajik-udyami.routes.ts:129` |
| GET | `/api/v1/partner/orgs/:slug/samajik-udyami/ham-niwasi-reports/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('samajik.udyami')` | `src/modules/partner/samajik-udyami.routes.ts:112` |
| PUT | `/api/v1/partner/orgs/:slug/samajik-udyami/ham-niwasi-reports/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('samajik.udyami')` | `src/modules/partner/samajik-udyami.routes.ts:120` |
| GET | `/api/v1/partner/orgs/:slug/samajik-udyami/volunteers` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('samajik.udyami')` | `src/modules/partner/samajik-udyami.routes.ts:49` |
| POST | `/api/v1/partner/orgs/:slug/samajik-udyami/volunteers` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('samajik.udyami')` | `src/modules/partner/samajik-udyami.routes.ts:58` |
| DELETE | `/api/v1/partner/orgs/:slug/samajik-udyami/volunteers/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('samajik.udyami')` | `src/modules/partner/samajik-udyami.routes.ts:84` |
| GET | `/api/v1/partner/orgs/:slug/samajik-udyami/volunteers/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('samajik.udyami')` | `src/modules/partner/samajik-udyami.routes.ts:67` |
| PUT | `/api/v1/partner/orgs/:slug/samajik-udyami/volunteers/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('samajik.udyami')` | `src/modules/partner/samajik-udyami.routes.ts:75` |
| GET | `/api/v1/partner/orgs/:slug/set-location` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('location.set')` | `src/modules/partner/set-location.routes.ts:24` |
| POST | `/api/v1/partner/orgs/:slug/set-location` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('location.set')` | `src/modules/partner/set-location.routes.ts:25` |
| POST | `/api/v1/partner/orgs/:slug/set-location/clear` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('location.set')` | `src/modules/partner/set-location.routes.ts:26` |
| GET | `/api/v1/partner/orgs/:slug/set-location/options/geo` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('location.set')` | `src/modules/partner/set-location.routes.ts:23` |
| GET | `/api/v1/partner/orgs/:slug/shared-projects` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:516` |
| POST | `/api/v1/partner/orgs/:slug/shared-projects/:ppId/decision` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:524` |
| POST | `/api/v1/partner/orgs/:slug/shared-projects/:ppId/permission` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:532` |
| GET | `/api/v1/partner/orgs/:slug/staff` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:783` |
| POST | `/api/v1/partner/orgs/:slug/staff` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:799` |
| GET | `/api/v1/partner/orgs/:slug/staff-contacts/:contactType/:contactId/interactions` | `requirePartnerPermission('staff.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/staff-contact.routes.ts:83` |
| POST | `/api/v1/partner/orgs/:slug/staff-contacts/:contactType/:contactId/interactions` | `requirePartnerPermission('staff.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/staff-contact.routes.ts:84` |
| GET | `/api/v1/partner/orgs/:slug/staff-contacts/interactions` | `requirePartnerPermission('staff.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/staff-contact.routes.ts:79` |
| DELETE | `/api/v1/partner/orgs/:slug/staff-contacts/interactions/:id` | `requirePartnerPermission('staff.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/staff-contact.routes.ts:82` |
| GET | `/api/v1/partner/orgs/:slug/staff-contacts/interactions/:id` | `requirePartnerPermission('staff.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/staff-contact.routes.ts:80` |
| PUT | `/api/v1/partner/orgs/:slug/staff-contacts/interactions/:id` | `requirePartnerPermission('staff.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/staff-contact.routes.ts:81` |
| GET | `/api/v1/partner/orgs/:slug/staff-contacts/org-categories` | `requirePartnerPermission('staff.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/staff-contact.routes.ts:66` |
| GET | `/api/v1/partner/orgs/:slug/staff-contacts/organisations` | `requirePartnerPermission('staff.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/staff-contact.routes.ts:67` |
| POST | `/api/v1/partner/orgs/:slug/staff-contacts/organisations` | `requirePartnerPermission('staff.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/staff-contact.routes.ts:69` |
| DELETE | `/api/v1/partner/orgs/:slug/staff-contacts/organisations/:id` | `requirePartnerPermission('staff.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/staff-contact.routes.ts:74` |
| GET | `/api/v1/partner/orgs/:slug/staff-contacts/organisations/:id` | `requirePartnerPermission('staff.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/staff-contact.routes.ts:72` |
| PUT | `/api/v1/partner/orgs/:slug/staff-contacts/organisations/:id` | `requirePartnerPermission('staff.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/staff-contact.routes.ts:73` |
| GET | `/api/v1/partner/orgs/:slug/staff-contacts/organisations/:sourceId/copy-fields` | `requirePartnerPermission('staff.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/staff-contact.routes.ts:71` |
| POST | `/api/v1/partner/orgs/:slug/staff-contacts/organisations/:sourceId/use` | `requirePartnerPermission('staff.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/staff-contact.routes.ts:70` |
| GET | `/api/v1/partner/orgs/:slug/staff-contacts/organisations/lookup` | `requirePartnerPermission('staff.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/staff-contact.routes.ts:68` |
| GET | `/api/v1/partner/orgs/:slug/staff-contacts/persons` | `requirePartnerPermission('staff.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/staff-contact.routes.ts:56` |
| POST | `/api/v1/partner/orgs/:slug/staff-contacts/persons` | `requirePartnerPermission('staff.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/staff-contact.routes.ts:58` |
| DELETE | `/api/v1/partner/orgs/:slug/staff-contacts/persons/:id` | `requirePartnerPermission('staff.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/staff-contact.routes.ts:63` |
| GET | `/api/v1/partner/orgs/:slug/staff-contacts/persons/:id` | `requirePartnerPermission('staff.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/staff-contact.routes.ts:61` |
| PUT | `/api/v1/partner/orgs/:slug/staff-contacts/persons/:id` | `requirePartnerPermission('staff.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/staff-contact.routes.ts:62` |
| GET | `/api/v1/partner/orgs/:slug/staff-contacts/persons/:sourceId/copy-fields` | `requirePartnerPermission('staff.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/staff-contact.routes.ts:60` |
| POST | `/api/v1/partner/orgs/:slug/staff-contacts/persons/:sourceId/use` | `requirePartnerPermission('staff.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/staff-contact.routes.ts:59` |
| GET | `/api/v1/partner/orgs/:slug/staff-contacts/persons/lookup` | `requirePartnerPermission('staff.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/staff-contact.routes.ts:57` |
| POST | `/api/v1/partner/orgs/:slug/staff-contacts/visiting-card` | `requirePartnerPermission('staff.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/staff-contact.routes.ts:52` |
| GET | `/api/v1/partner/orgs/:slug/staff-contacts/visiting-card/:filename` | `requirePartnerPermission('staff.contact')`, `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/staff-contact.routes.ts:53` |
| GET | `/api/v1/partner/orgs/:slug/staff-portal` | `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/partner.routes.ts:168` |
| GET | `/api/v1/partner/orgs/:slug/staff-portal/communities` | `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/partner.routes.ts:175` |
| DELETE | `/api/v1/partner/orgs/:slug/staff/:id` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:822` |
| GET | `/api/v1/partner/orgs/:slug/staff/:id` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:807` |
| PUT | `/api/v1/partner/orgs/:slug/staff/:id` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:814` |
| GET | `/api/v1/partner/orgs/:slug/staff/:staffId/detail` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/staff-profile.routes.ts:43` |
| GET | `/api/v1/partner/orgs/:slug/staff/:staffId/profile` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/staff-profile.routes.ts:28` |
| POST | `/api/v1/partner/orgs/:slug/staff/:staffId/profile` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/staff-profile.routes.ts:35` |
| DELETE | `/api/v1/partner/orgs/:slug/staff/location/urban/locality/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('master.location')` | `src/modules/partner/location-master.routes.ts:87` |
| GET | `/api/v1/partner/orgs/:slug/staff/location/urban/locality/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('master.location')` | `src/modules/partner/location-master.routes.ts:70` |
| PUT | `/api/v1/partner/orgs/:slug/staff/location/urban/locality/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('master.location')` | `src/modules/partner/location-master.routes.ts:78` |
| GET | `/api/v1/partner/orgs/:slug/staff/location/urban/locality/options` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('master.location')` | `src/modules/partner/location-master.routes.ts:52` |
| GET | `/api/v1/partner/orgs/:slug/staff/location/urban/locality/options/geo` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('master.location')` | `src/modules/partner/location-master.routes.ts:43` |
| DELETE | `/api/v1/partner/orgs/:slug/staff/location/urban/mohalla/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('master.location')` | `src/modules/partner/location-master.routes.ts:151` |
| GET | `/api/v1/partner/orgs/:slug/staff/location/urban/mohalla/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('master.location')` | `src/modules/partner/location-master.routes.ts:134` |
| PUT | `/api/v1/partner/orgs/:slug/staff/location/urban/mohalla/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('master.location')` | `src/modules/partner/location-master.routes.ts:142` |
| GET | `/api/v1/partner/orgs/:slug/staff/location/urban/mohalla/options` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('master.location')` | `src/modules/partner/location-master.routes.ts:116` |
| GET | `/api/v1/partner/orgs/:slug/staff/location/urban/mohalla/options/geo` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('master.location')` | `src/modules/partner/location-master.routes.ts:107` |
| GET | `/api/v1/partner/orgs/:slug/staff/parent-options` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:791` |
| DELETE | `/api/v1/partner/orgs/:slug/surveyor-mohallas/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('facility.surveyorMohalla')` | `src/modules/partner/surveyor-mohalla.routes.ts:74` |
| GET | `/api/v1/partner/orgs/:slug/surveyor-mohallas/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('facility.surveyorMohalla')` | `src/modules/partner/surveyor-mohalla.routes.ts:57` |
| PUT | `/api/v1/partner/orgs/:slug/surveyor-mohallas/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('facility.surveyorMohalla')` | `src/modules/partner/surveyor-mohalla.routes.ts:65` |
| GET | `/api/v1/partner/orgs/:slug/surveyor-mohallas/options` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('facility.surveyorMohalla')` | `src/modules/partner/surveyor-mohalla.routes.ts:39` |
| GET | `/api/v1/partner/orgs/:slug/surveys/businesses` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('partnerSurvey.view')` | `src/modules/partner/survey-business.routes.ts:36` |
| POST | `/api/v1/partner/orgs/:slug/surveys/businesses` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('partnerSurvey.set')` | `src/modules/partner/survey-business.routes.ts:45` |
| DELETE | `/api/v1/partner/orgs/:slug/surveys/businesses/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('partnerSurvey.set')` | `src/modules/partner/survey-business.routes.ts:71` |
| GET | `/api/v1/partner/orgs/:slug/surveys/businesses/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('partnerSurvey.view')` | `src/modules/partner/survey-business.routes.ts:54` |
| PUT | `/api/v1/partner/orgs/:slug/surveys/businesses/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('partnerSurvey.set')` | `src/modules/partner/survey-business.routes.ts:62` |
| GET | `/api/v1/partner/orgs/:slug/surveys/families` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('partnerSurvey.view')` | `src/modules/partner/survey-family.routes.ts:33` |
| POST | `/api/v1/partner/orgs/:slug/surveys/families` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('partnerSurvey.set')` | `src/modules/partner/survey-family.routes.ts:42` |
| DELETE | `/api/v1/partner/orgs/:slug/surveys/families/:familyId` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('partnerSurvey.set')` | `src/modules/partner/survey-family.routes.ts:68` |
| GET | `/api/v1/partner/orgs/:slug/surveys/families/:familyId` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('partnerSurvey.view')` | `src/modules/partner/survey-family.routes.ts:51` |
| PUT | `/api/v1/partner/orgs/:slug/surveys/families/:familyId` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('partnerSurvey.set')` | `src/modules/partner/survey-family.routes.ts:59` |
| GET | `/api/v1/partner/orgs/:slug/surveys/families/:familyId/members` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('partnerSurvey.view')` | `src/modules/partner/survey-family.routes.ts:78` |
| POST | `/api/v1/partner/orgs/:slug/surveys/families/:familyId/members` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('partnerSurvey.set')` | `src/modules/partner/survey-family.routes.ts:87` |
| DELETE | `/api/v1/partner/orgs/:slug/surveys/families/:familyId/members/:memberId` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('partnerSurvey.set')` | `src/modules/partner/survey-family.routes.ts:113` |
| GET | `/api/v1/partner/orgs/:slug/surveys/families/:familyId/members/:memberId` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('partnerSurvey.view')` | `src/modules/partner/survey-family.routes.ts:96` |
| PUT | `/api/v1/partner/orgs/:slug/surveys/families/:familyId/members/:memberId` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('partnerSurvey.set')` | `src/modules/partner/survey-family.routes.ts:104` |
| GET | `/api/v1/partner/orgs/:slug/surveys/land-mass` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('partnerSurvey.view')` | `src/modules/partner/survey-building.routes.ts:36` |
| POST | `/api/v1/partner/orgs/:slug/surveys/land-mass` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('partnerSurvey.set')` | `src/modules/partner/survey-building.routes.ts:53` |
| DELETE | `/api/v1/partner/orgs/:slug/surveys/land-mass/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('partnerSurvey.set')` | `src/modules/partner/survey-building.routes.ts:79` |
| GET | `/api/v1/partner/orgs/:slug/surveys/land-mass/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('partnerSurvey.view')` | `src/modules/partner/survey-building.routes.ts:62` |
| PUT | `/api/v1/partner/orgs/:slug/surveys/land-mass/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('partnerSurvey.set')` | `src/modules/partner/survey-building.routes.ts:70` |
| GET | `/api/v1/partner/orgs/:slug/surveys/land-mass/options` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('partnerSurvey.view')` | `src/modules/partner/survey-building.routes.ts:45` |
| GET | `/api/v1/partner/orgs/:slug/surveys/weighing-forms` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('partnerSurvey.view')` | `src/modules/partner/survey-weighing.routes.ts:35` |
| POST | `/api/v1/partner/orgs/:slug/surveys/weighing-forms` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('partnerSurvey.set')` | `src/modules/partner/survey-weighing.routes.ts:44` |
| DELETE | `/api/v1/partner/orgs/:slug/surveys/weighing-forms/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('partnerSurvey.set')` | `src/modules/partner/survey-weighing.routes.ts:71` |
| GET | `/api/v1/partner/orgs/:slug/surveys/weighing-forms/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('partnerSurvey.view')` | `src/modules/partner/survey-weighing.routes.ts:53` |
| PUT | `/api/v1/partner/orgs/:slug/surveys/weighing-forms/:id` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('partnerSurvey.set')` | `src/modules/partner/survey-weighing.routes.ts:62` |
| POST | `/api/v1/partner/orgs/:slug/surveys/weighing-forms/:id/observations` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('partnerSurvey.set')` | `src/modules/partner/survey-weighing.routes.ts:81` |
| DELETE | `/api/v1/partner/orgs/:slug/surveys/weighing-forms/:id/observations/:obsId` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('partnerSurvey.set')` | `src/modules/partner/survey-weighing.routes.ts:107` |
| GET | `/api/v1/partner/orgs/:slug/surveys/weighing-forms/:id/observations/:obsId` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('partnerSurvey.view')` | `src/modules/partner/survey-weighing.routes.ts:90` |
| PUT | `/api/v1/partner/orgs/:slug/surveys/weighing-forms/:id/observations/:obsId` | `requirePartnerAuth`, `requireOrgMember`, `requirePartnerPermission('partnerSurvey.set')` | `src/modules/partner/survey-weighing.routes.ts:98` |
| GET | `/api/v1/partner/orgs/:slug/users` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:252` |
| POST | `/api/v1/partner/orgs/:slug/users/:roleRowId/decision` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:262` |
| POST | `/api/v1/partner/orgs/:slug/users/:roleRowId/event-coordinator` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:281` |
| POST | `/api/v1/partner/orgs/:slug/users/:roleRowId/facilitator` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:272` |
| PUT | `/api/v1/partner/orgs/:slug/users/:userId` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:309` |
| GET | `/api/v1/partner/orgs/:slug/users/:userId/edit` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:300` |
| POST | `/api/v1/partner/orgs/:slug/users/:userId/enabled` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:290` |
| GET | `/api/v1/partner/orgs/:slug/wards` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:409` |
| POST | `/api/v1/partner/orgs/:slug/wards` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:424` |
| GET | `/api/v1/partner/orgs/:slug/wards/available` | `requirePartnerAuth`, `requireOrgAccess` | `src/modules/partner/partner.routes.ts:417` |
| GET | `/api/v1/partner/orgs/:slug/work-requests` | `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/partner.routes.ts:850` |
| GET | `/api/v1/partner/orgs/:slug/work-requests/:id` | `requirePartnerAuth`, `requireOrgMember` | `src/modules/partner/partner.routes.ts:858` |
| POST | `/api/v1/partner/orgs/:slug/work-requests/:wrspId/feedback` | `requirePartnerAuth`, `requirePartnerPermission('workRequest.respond')` | `src/modules/partner/partner.routes.ts:880` |
| POST | `/api/v1/partner/orgs/:slug/work-requests/:wrspId/interest` | `requirePartnerAuth`, `requirePartnerPermission('workRequest.respond')` | `src/modules/partner/partner.routes.ts:873` |
| POST | `/api/v1/partner/orgs/:slug/work-requests/:wrspId/respond` | `requirePartnerAuth`, `requirePartnerPermission('workRequest.respond')` | `src/modules/partner/partner.routes.ts:865` |
| GET | `/api/v1/partner/partner-heads` | `requirePartnerAuth`, `requirePartnerPermission('partnerHead.approve')` | `src/modules/partner/partner.routes.ts:706` |
| POST | `/api/v1/partner/partner-heads/:id/decision` | `requirePartnerAuth`, `requirePartnerPermission('partnerHead.approve')` | `src/modules/partner/partner.routes.ts:711` |
| GET | `/api/v1/partner/partners` | `requirePartnerAuth`, `requirePartnerPermission('partner.org.manage')` | `src/modules/partner/partner.routes.ts:672` |
| POST | `/api/v1/partner/partners` | `requirePartnerAuth`, `requirePartnerPermission('partner.org.manage')` | `src/modules/partner/partner.routes.ts:677` |
| DELETE | `/api/v1/partner/partners/:id` | `requirePartnerAuth`, `requirePartnerPermission('partner.org.manage')` | `src/modules/partner/partner.routes.ts:692` |
| GET | `/api/v1/partner/partners/:id` | `requirePartnerAuth`, `requirePartnerPermission('partner.org.manage')` | `src/modules/partner/partner.routes.ts:682` |
| PUT | `/api/v1/partner/partners/:id` | `requirePartnerAuth`, `requirePartnerPermission('partner.org.manage')` | `src/modules/partner/partner.routes.ts:687` |
| GET | `/api/v1/partner/ping` | public | `src/modules/partner/partner.routes.ts:112` |
| GET | `/api/v1/partner/roles` | public | `src/modules/partner/partner.routes.ts:121` |

### `/api/v1/profile` (11)

| Method | Path | Guards | Source |
|---|---|---|---|
| GET | `/api/v1/profile` | `requireAuth` | `src/modules/profile/profile.routes.ts:33` |
| PUT | `/api/v1/profile` | `requireAuth` | `src/modules/profile/profile.routes.ts:34` |
| POST | `/api/v1/profile/achievements` | `requireAuth` | `src/modules/profile/profile.routes.ts:60` |
| DELETE | `/api/v1/profile/achievements/:id` | `requireAuth` | `src/modules/profile/profile.routes.ts:62` |
| PUT | `/api/v1/profile/achievements/:id` | `requireAuth` | `src/modules/profile/profile.routes.ts:61` |
| POST | `/api/v1/profile/change-password` | `requireAuth` | `src/modules/profile/profile.routes.ts:40` |
| POST | `/api/v1/profile/education` | `requireAuth` | `src/modules/profile/profile.routes.ts:56` |
| DELETE | `/api/v1/profile/education/:id` | `requireAuth` | `src/modules/profile/profile.routes.ts:58` |
| PUT | `/api/v1/profile/education/:id` | `requireAuth` | `src/modules/profile/profile.routes.ts:57` |
| GET | `/api/v1/profile/picture` | `requireAuth` | `src/modules/profile/profile.routes.ts:54` |
| POST | `/api/v1/profile/picture` | `requireAuth` | `src/modules/profile/profile.routes.ts:46` |
