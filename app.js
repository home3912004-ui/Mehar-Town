/* ==========================================================================
   Mehar Town Web App / PWA Core JavaScript Logic
   ========================================================================== */

// Simulated Local Database State
const DB_VERSION = "1.0";
const DEFAULT_DATABASE = {
    users: [
        { id: "u_citizen", name: "علي احمد ملوڪاڻي", phone: "03001234567", role: "citizen", uc: "uc_mehar1", village: "شاهي بازار", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80", points: 120, badge: "ماحول دوست" },
        { id: "u_worker", name: "سجاد علي چانڊيو", phone: "03011234567", role: "worker", uc: "uc_mehar2", village: "بند روڊ", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80", points: 450, badge: "سماجي رهنما" },
        { id: "u_admin", name: "ايڊمن ميهڙ ٽائون", phone: "03021234567", role: "admin", uc: "uc_mehar1", village: "ميهڙ سٽي", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80", points: 1000, badge: "سنجيده آفيسر" },
        { id: "u_super", name: "سپر ايڊمن سنڌ", phone: "03031234567", role: "superadmin", uc: "uc_mehar1", village: "ڪراچي", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80", points: 2500, badge: "سسٽم مالڪ" }
    ],
    unionCouncils: [
        { id: "uc_mehar1", name: "يوسي ميهڙ 1 (شھري)", population: "45,000", schools: 12, hospitals: 2, resolvedRate: 85, color: "#0d9488" },
        { id: "uc_mehar2", name: "يوسي ميهڙ 2 (شھري)", population: "40,000", schools: 10, hospitals: 1, resolvedRate: 78, color: "#3b82f6" },
        { id: "uc_radhan", name: "يوسي راڌڻ", population: "32,000", schools: 15, hospitals: 3, resolvedRate: 90, color: "#10b981" },
        { id: "uc_balishah", name: "يوسي بالي شاهه", population: "25,000", schools: 8, hospitals: 1, resolvedRate: 60, color: "#f59e0b" },
        { id: "uc_thariri", name: "يوسي ٿريڙي محبت", population: "38,000", schools: 14, hospitals: 2, resolvedRate: 72, color: "#8b5cf6" },
        { id: "uc_faridabad", name: "يوسي فريدآباد", population: "29,000", schools: 9, hospitals: 1, resolvedRate: 65, color: "#ec4899" },
        { id: "uc_sobho", name: "يوسي سوبھو خان", population: "22,000", schools: 7, hospitals: 0, resolvedRate: 50, color: "#14b8a6" }
    ],
    complaints: [
        {
            id: "comp_101",
            title: "شاهي بازار ۾ گندي پاڻي جو نڪاس",
            desc: "شاهي بازار ۾ گٽر جو پاڻي گڏ ٿي ويو آهي جنهن ڪري عام شهرين توڙي دڪاندارن کي اچ وڃ ۾ سخت تڪليف درپيش آهي. مهرباني ڪري نيڪال جو بندوبست ڪيو وڃي.",
            category: "drainage",
            image: "https://images.unsplash.com/photo-1599740831418-b220387639c0?w=500&auto=format&fit=crop&q=80",
            uc: "uc_mehar1",
            village: "شاهي بازار ميهڙ",
            coords: [27.1785, 67.8235],
            votes: 24,
            votedUsers: ["u_worker"],
            status: "progress",
            summary: "شاهي بازار ۾ گٽرن جي بندش سبب گندو پاڻي گهٽين ۾ گڏ ٿيل آهي.",
            comments: [
                { user: "سجاد علي چانڊيو", txt: "هي مسئلو گذريل ٽن ڏينهن کان هلي پيو.", time: "2 ڪلاڪ اڳ" }
            ],
            user: "علي احمد ملوڪاڻي",
            createdAt: "2026-06-05T10:30:00Z"
        },
        {
            id: "comp_102",
            title: "سول اسپتال روڊ جي اسٽريٽ لائيٽ خراب",
            desc: "سول اسپتال روڊ تي لڳل سڀئي اسٽريٽ لائيٽون بند پيون آهن، رات جي وقت سخت اونداهي هجي ٿي جنهن سبب چوري جو خدشو رهي ٿو.",
            category: "lights",
            image: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=500&auto=format&fit=crop&q=80",
            uc: "uc_mehar2",
            village: "سول اسپتال روڊ",
            coords: [27.1722, 67.8201],
            votes: 15,
            votedUsers: [],
            status: "pending",
            summary: "سول اسپتال روڊ تي اسٽريٽ لائيٽن جي بند هجڻ سبب اونداهي ۽ چوري جو خطرو.",
            comments: [],
            user: "سجاد علي چانڊيو",
            createdAt: "2026-06-06T08:15:00Z"
        },
        {
            id: "comp_103",
            title: "سٽي پرائمري اسڪول ۾ ڪچري جا ڍير",
            desc: "اسڪول جي مکيه دروازي آڏو ڪچرو اڇلايو پيو وڃي جنهن مان سخت بدبوءِ اچي ٿي ۽ ٻارن جي صحت خراب ٿيڻ جو خطرو آهي.",
            category: "cleansing",
            image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=500&auto=format&fit=crop&q=80",
            uc: "uc_mehar1",
            village: "وارڊ نمبر 3",
            coords: [27.1812, 67.8189],
            votes: 45,
            votedUsers: ["u_citizen", "u_worker"],
            status: "resolved",
            summary: "اسڪول آڏو ڪچرو اڇلائڻ سان بيماريون پکڙجڻ جو خدشو.",
            comments: [
                { user: "ايڊمن ميهڙ ٽائون", txt: "ٽائون جي صفائي عملي ڪچرو کڻائي ڇڏيو آهي. هاڻي صورتحال بهتر آهي.", time: "1 ڏينهن اڳ" }
            ],
            user: "علي احمد ملوڪاڻي",
            createdAt: "2026-06-04T12:00:00Z"
        }
    ],
    projects: [
        { id: "proj_1", title: "ميهڙ باءِ پاس روڊ جي نئين سر تعمير", category: "road", uc: "uc_mehar1", budget: "5,00,00,000 RS", progress: 65, contractor: "شاهين ڪنسٽرڪشن ڪمپني", start: "2026-01-15", end: "2026-08-30" },
        { id: "proj_2", title: "ٿريڙي محبت ۾ سولر آر او واٽر فلٽر پلانٽ", category: "water", uc: "uc_thariri", budget: "1,20,00,000 RS", progress: 90, contractor: "سندھ ڪلين واٽر سوليوشنز", start: "2026-03-01", end: "2026-06-25" },
        { id: "proj_3", title: "فريدآباد پرائمري هيلٿ سينٽر جي مرمت", category: "health", uc: "uc_faridabad", budget: "85,00,000 RS", progress: 30, contractor: "المدينه بلڊرز ميهڙ", start: "2026-05-10", end: "2026-10-15" }
    ],
    surveys: [
        { id: "srv_1", question: "ڇا اسان کي شاهي بازار ۾ نئين اسٽريٽ لائيٽس لڳائڻ گهرجن؟", options: [{ text: "ها، تمام ضروري آهي", votes: 84 }, { text: "نه، اڳ ئي لڳل آهن", votes: 12 }, { text: "ٻيون ترجيحات آهن", votes: 20 }], votedUsers: ["u_citizen"] },
        { id: "srv_2", question: "ميهڙ ٽائون پارڪ ۾ ٻارن جي رانديڪن لاءِ ڪهڙي جڳهه بهتر رهندي؟", options: [{ text: "بند روڊ پاسو", votes: 41 }, { text: "بائي پاس روڊ طرف", votes: 55 }], votedUsers: [] }
    ],
    notifications: [
        { id: "nt_1", text: "توهان جي شڪايت 'سٽي پرائمري اسڪول ۾ ڪچري جا ڍير' حل ڪئي وئي آهي.", time: "1 ڏينهن اڳ", read: false },
        { id: "nt_2", text: "سوشل ورڪر سجاد علي چانڊيو هڪ نئين ڪميونٽي صفائي مهم شروع ڪئي آهي.", time: "2 ڏينهن اڳ", read: true }
    ],
    activityLogs: [
        { user: "ايڊمن ميهڙ ٽائون", action: "شڪايت #103 کي حل ٿيل قرار ڏنو", time: "2026-06-05" }
    ],
    categories: {
        cleansing: { label: "صفائي", icon: "fa-trash-can" },
        water: { label: "پاڻي", icon: "fa-droplet" },
        lights: { label: "اسٽريٽ لائيٽ", icon: "fa-lightbulb" },
        road: { label: "روڊ تعمير", icon: "fa-road" },
        drainage: { label: "نيڪال آب", icon: "fa-water" },
        education: { label: "تعليم", icon: "fa-school" },
        health: { label: "صحت", icon: "fa-heart-pulse" },
        other: { label: "ٻيا", icon: "fa-circle-ellipsis" }
    }
};

// State Engine Class
class MeharTownApp {
    constructor() {
        this.db = {};
        this.currentUser = null;
        this.currentScreen = "splash";
        this.selectedCategory = null;
        this.activeMap = null;
        this.selectedCoords = [27.1772, 67.8229]; // Default Mehar Center
        this.uploadedImage = null;
        this.toastTimeout = null;
        
        this.initDatabase();
        this.initRoleSelector();
        this.setupTime();
    }

    initDatabase() {
        const localData = localStorage.getItem("mehar_town_db");
        if (localData) {
            try {
                this.db = JSON.parse(localData);
            } catch (e) {
                console.error("Database parsing failed. Seeding default...", e);
                this.db = JSON.parse(JSON.stringify(DEFAULT_DATABASE));
                this.saveDb();
            }
        } else {
            this.db = JSON.parse(JSON.stringify(DEFAULT_DATABASE));
            this.saveDb();
        }

        // Set Default logged-in user (Citizen)
        this.currentUser = this.db.users.find(u => u.role === "citizen") || this.db.users[0];
    }

    saveDb() {
        localStorage.setItem("mehar_town_db", JSON.stringify(this.db));
    }

    setupTime() {
        const updateClock = () => {
            const clockEl = document.getElementById("status-time");
            if (clockEl) {
                const now = new Date();
                let hrs = now.getHours();
                let mins = now.getMinutes();
                hrs = hrs < 10 ? '0' + hrs : hrs;
                mins = mins < 10 ? '0' + mins : mins;
                clockEl.textContent = `${hrs}:${mins}`;
            }
        };
        updateClock();
        setInterval(updateClock, 1000);
    }

    initRoleSelector() {
        // Desktop sidebar role simulation buttons
        const roleBtns = document.querySelectorAll(".role-btn");
        roleBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                roleBtns.forEach(b => b.classList.remove("active"));
                const role = btn.getAttribute("data-role");
                btn.classList.add("active");
                
                // Switch session user
                this.currentUser = this.db.users.find(u => u.role === role);
                this.showToast(`توهان ڪاميابيءَ سان ${this.getRoleLabel(role)} طور لاگ ان ٿي ويا آهيو!`, "success");
                
                // Update App layout & Re-render current screen
                this.updateAppHeader();
                this.updateAppNav();
                this.navigateTo(this.currentScreen);
            });
        });
    }

    getRoleLabel(role) {
        switch (role) {
            case "citizen": return "عام شهري";
            case "worker": return "سوشل ورڪر";
            case "admin": return "ايڊمن";
            case "superadmin": return "سپر ايڊمن";
            default: return "يوزر";
        }
    }

    updateAppHeader() {
        const header = document.getElementById("app-header");
        if (this.currentScreen === "splash" || this.currentScreen === "login" || this.currentScreen === "register") {
            header.classList.add("hidden");
            return;
        }
        header.classList.remove("hidden");

        const avatarEl = document.getElementById("header-avatar");
        const nameEl = document.getElementById("header-username");
        const notifBadge = document.getElementById("notif-badge");

        avatarEl.src = this.currentUser.avatar;
        nameEl.textContent = this.currentUser.name;

        // Unread Notifications Count
        const unreadCount = this.db.notifications.filter(n => !n.read).length;
        if (unreadCount > 0) {
            notifBadge.textContent = unreadCount;
            notifBadge.classList.remove("hidden");
        } else {
            notifBadge.classList.add("hidden");
        }
    }

    updateAppNav() {
        const nav = document.getElementById("app-nav");
        if (this.currentScreen === "splash" || this.currentScreen === "login" || this.currentScreen === "register") {
            nav.classList.add("hidden");
            return;
        }
        nav.classList.remove("hidden");

        // Clear active classes and set the correct tab
        const navItems = nav.querySelectorAll(".nav-item");
        navItems.forEach(item => {
            item.classList.remove("active");
            if (item.getAttribute("data-screen") === this.currentScreen) {
                item.classList.add("active");
            }
        });

        // Set Navigation event listeners (once)
        if (!nav.dataset.initialized) {
            navItems.forEach(item => {
                item.addEventListener("click", () => {
                    const target = item.getAttribute("data-screen");
                    this.navigateTo(target);
                });
            });
            nav.dataset.initialized = "true";
        }
    }

    navigateTo(screenId, params = null) {
        this.currentScreen = screenId;
        this.updateAppHeader();
        this.updateAppNav();

        const viewport = document.getElementById("screen-viewport");
        viewport.innerHTML = ""; // Clear current view

        const animWrapper = document.createElement("div");
        animWrapper.className = "screen-animate";
        animWrapper.innerHTML = this.renderScreen(screenId, params);
        viewport.appendChild(animWrapper);
        
        // Post-render lifecycle setups (e.g., Maps, uploads)
        this.onScreenLoaded(screenId, params);
        viewport.scrollTop = 0;
    }

    renderScreen(id, params) {
        switch (id) {
            case "splash":
                return `
                    <div class="splash-container">
                        <img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=300&auto=format&fit=crop&q=80" alt="Logo" class="splash-logo">
                        <h1 class="splash-title">ميهڙ ٽائون پورٽل</h1>
                        <p class="splash-subtitle">شڪايتن جي ازالي ۽ ترقياتي ڪمن جي نگرانيءَ جو پهرين سنڌي پورٽل PWA</p>
                        <button class="btn-primary" onclick="app.navigateTo('login')" style="margin-top:20px; font-size:1.1rem; padding:15px;">
                            <i class="fa-solid fa-arrow-left"></i> شروع ڪريو
                        </button>
                    </div>
                `;

            case "login":
                return `
                    <div class="login-header">
                        <h3>لاگ ان ٿيو</h3>
                        <p>پنھنجي اڪائونٽ ۾ داخل ٿيڻ لاءِ چونڊيو</p>
                    </div>
                    <div class="glass-card" style="display:flex; flex-direction:column; gap:16px;">
                        <div class="form-group">
                            <label>فون نمبر داخل ڪريو</label>
                            <input type="tel" placeholder="03001234567" class="form-control" style="font-family:'Outfit'">
                        </div>
                        <div class="form-group">
                            <label>پاسورڊ</label>
                            <input type="password" placeholder="••••••" class="form-control">
                        </div>
                        <button class="btn-primary" onclick="app.loginUser()">لاگ ان ٿيو</button>
                        <div style="text-align:center; font-size:0.8rem; margin:10px 0;">
                            نئون اڪائونٽ ٺاهڻ چاهيو ٿا؟ 
                            <a onclick="app.navigateTo('register')" style="color:var(--primary); font-weight:700; cursor:pointer;">سائن اپ ڪريو</a>
                        </div>
                    </div>
                    <div class="login-header" style="margin-top:10px;">
                        <p style="font-size:0.75rem; color:var(--text-muted);">Simulator Quick Login / رول ٽيسٽنگ:</p>
                    </div>
                    <div class="login-quick-cards">
                        <div class="quick-card" onclick="app.quickLogin('citizen')">
                            <i class="fa-solid fa-user"></i>
                            <div>عام شهري</div>
                            <span>Citizen</span>
                        </div>
                        <div class="quick-card" onclick="app.quickLogin('worker')">
                            <i class="fa-solid fa-handshake-angle"></i>
                            <div>سوشل ورڪر</div>
                            <span>Worker</span>
                        </div>
                        <div class="quick-card" onclick="app.quickLogin('admin')">
                            <i class="fa-solid fa-user-shield"></i>
                            <div>ايڊمن</div>
                            <span>Admin</span>
                        </div>
                        <div class="quick-card" onclick="app.quickLogin('superadmin')">
                            <i class="fa-solid fa-user-ninja"></i>
                            <div>سپر ايڊمن</div>
                            <span>Super Admin</span>
                        </div>
                    </div>
                `;

            case "register":
                return `
                    <div class="login-header">
                        <h3>سائن اپ / رجسٽريشن</h3>
                        <p>پورٽل تي پنهنجو نئون اڪائونٽ رجسٽر ڪريو</p>
                    </div>
                    <div class="glass-card" style="display:flex; flex-direction:column; gap:12px;">
                        <div class="form-group">
                            <label>پورو نالو</label>
                            <input type="text" placeholder="مثال: علي چانڊيو" id="reg-name" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>فون نمبر</label>
                            <input type="tel" placeholder="03001234567" id="reg-phone" class="form-control" style="font-family:'Outfit'">
                        </div>
                        <div class="form-group">
                            <label>يونين ڪائونسل چونڊيو</label>
                            <select id="reg-uc" class="form-control">
                                ${this.db.unionCouncils.map(uc => `<option value="${uc.id}">${uc.name}</option>`).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label>ڳوٺ / محلو</label>
                            <input type="text" placeholder="مثال: وارڊ نمبر 2" id="reg-village" class="form-control">
                        </div>
                        <button class="btn-primary" onclick="app.registerUser()" style="margin-top:10px;">رجسٽريشن مڪمل ڪريو</button>
                        <div style="text-align:center; font-size:0.8rem; margin:8px 0;">
                            اڳ ۾ ئي کاتو اٿو؟ 
                            <a onclick="app.navigateTo('login')" style="color:var(--primary); font-weight:700; cursor:pointer;">لاگ ان ٿيو</a>
                        </div>
                    </div>
                `;

            case "home":
                return this.renderHomeDashboard();

            case "add-complaint":
                return this.renderAddComplaint();

            case "complaint-detail":
                return this.renderComplaintDetail(params);

            case "complaints":
                return this.renderComplaintsFeed();

            case "map":
                return `
                    <div class="section-title-bar">
                        <h3>ٽائون نقشو - شڪايتون ۽ ڪم</h3>
                    </div>
                    <div class="map-container-wrap">
                        <div id="map-element"></div>
                        <div class="map-floating-overlay">
                            <span class="map-overlay-title"><i class="fa-solid fa-map-pin"></i> ميپ فلٽرز</span>
                            <div class="map-legends">
                                <span><span class="legend-dot" style="background:var(--danger)"></span>انتظار ۾</span>
                                <span><span class="legend-dot" style="background:#a855f7"></span>جاري</span>
                                <span><span class="legend-dot" style="background:var(--success)"></span>حل ٿيل</span>
                                <span><span class="legend-dot" style="background:var(--info)"></span>سرڪاري ڪم</span>
                            </div>
                        </div>
                    </div>
                `;

            case "uc-stats":
                return this.renderUcStats(params);

            case "social":
                return this.renderSocialFeed();

            case "projects":
                return this.renderProjectsTracker();

            case "voting":
                return this.renderVotingSurveys();

            case "directory":
                return `
                    <div class="section-title-bar">
                        <h3>اهم ۽ هنگامي رابطا (Emergency)</h3>
                    </div>
                    <div class="contact-list">
                        ${this.db.surveys ? `
                            <div class="glass-card contact-card">
                                <div class="uc-info">
                                    <span class="contact-name">تعلقه اسپتال ميهڙ (Civil Hospital)</span>
                                    <span class="contact-num">025-4730121</span>
                                </div>
                                <a href="tel:0254730121" class="contact-btn"><i class="fa-solid fa-phone"></i></a>
                            </div>
                            <div class="glass-card contact-card">
                                <div class="uc-info">
                                    <span class="contact-name">پوليس اسٽيشن ميهڙ (Police Station)</span>
                                    <span class="contact-num">025-4730130</span>
                                </div>
                                <a href="tel:0254730130" class="contact-btn"><i class="fa-solid fa-phone"></i></a>
                            </div>
                            <div class="glass-card contact-card">
                                <div class="uc-info">
                                    <span class="contact-name">فائر برگيڊ ميهڙ (Fire Brigade)</span>
                                    <span class="contact-num">16 / 025-4730125</span>
                                </div>
                                <a href="tel:16" class="contact-btn" style="background:#ef4444;"><i class="fa-solid fa-fire-extinguisher"></i></a>
                            </div>
                            <div class="glass-card contact-card">
                                <div class="uc-info">
                                    <span class="contact-name">ٽائون ڪميٽي آفيس (Municipal Committee)</span>
                                    <span class="contact-num">025-4730050</span>
                                </div>
                                <a href="tel:0254730050" class="contact-btn"><i class="fa-solid fa-phone"></i></a>
                            </div>
                            <div class="glass-card contact-card">
                                <div class="uc-info">
                                    <span class="contact-name">سوئي گيس ايمرجنسي (Sui Gas Help)</span>
                                    <span class="contact-num">1199</span>
                                </div>
                                <a href="tel:1199" class="contact-btn" style="background:#f59e0b;"><i class="fa-solid fa-phone"></i></a>
                            </div>
                        ` : ''}
                    </div>
                `;

            case "profile":
                return this.renderUserProfile();

            case "notifications":
                return this.renderNotifications();

            case "admin-dashboard":
                return this.renderAdminDashboard();

            case "admin-moderation":
                return this.renderAdminModeration();

            case "admin-users":
                return this.renderAdminUsers();

            case "admin-reports":
                return this.renderAdminReports();

            case "settings":
                return this.renderSettings();

            case "menu":
                return this.renderMenuScreen();

            default:
                return `<div class="glass-card">اسڪرين نمبر ${id} اڃا دستياب ناهي.</div>`;
        }
    }

    renderHomeDashboard() {
        const totalComplaints = this.db.complaints.length;
        const resolvedCount = this.db.complaints.filter(c => c.status === "resolved").length;
        const progressCount = this.db.complaints.filter(c => c.status === "progress").length;
        const activeProjects = this.db.projects.length;

        return `
            <div class="home-metric-grid">
                <div class="metric-card" onclick="app.navigateTo('complaints')">
                    <div class="metric-icon"><i class="fa-solid fa-triangle-exclamation"></i></div>
                    <div class="metric-info">
                        <span class="metric-val">${totalComplaints}</span>
                        <span class="metric-lbl">داخل ٿيل شڪايتون</span>
                    </div>
                </div>
                <div class="metric-card" onclick="app.navigateTo('projects')">
                    <div class="metric-icon" style="color:#0ea5e9; background:rgba(14,165,233,0.15)"><i class="fa-solid fa-person-digging"></i></div>
                    <div class="metric-info">
                        <span class="metric-val">${activeProjects}</span>
                        <span class="metric-lbl">جاري ترقياتي ڪم</span>
                    </div>
                </div>
                <div class="metric-card" onclick="app.navigateTo('complaints', 'resolved')">
                    <div class="metric-icon" style="color:var(--success); background:rgba(16,185,129,0.15)"><i class="fa-solid fa-circle-check"></i></div>
                    <div class="metric-info">
                        <span class="metric-val">${resolvedCount}</span>
                        <span class="metric-lbl">حل ٿيل مسئلا</span>
                    </div>
                </div>
                <div class="metric-card" onclick="app.navigateTo('uc-stats')">
                    <div class="metric-icon" style="color:var(--secondary); background:rgba(245,158,11,0.15)"><i class="fa-solid fa-ranking-star"></i></div>
                    <div class="metric-info">
                        <span class="metric-val">82%</span>
                        <span class="metric-lbl">يو سي ريٽنگ اوسط</span>
                    </div>
                </div>
            </div>

            <!-- Featured complaints carousel -->
            <div class="section-title-bar">
                <h3>اهم ۽ تازيون شڪايتون</h3>
                <a onclick="app.navigateTo('complaints')">سڀ ڏسو</a>
            </div>
            <div class="carousel-container">
                ${this.db.complaints.map(c => `
                    <div class="carousel-card" onclick="app.navigateTo('complaint-detail', '${c.id}')">
                        <div class="carousel-img-wrap">
                            <img src="${c.image}" class="carousel-img" alt="Issue">
                            <span class="carousel-badge badge-status ${this.getStatusBadgeClass(c.status)}">
                                ${this.getStatusLabel(c.status)}
                            </span>
                        </div>
                        <div class="carousel-meta">
                            <span class="carousel-title">${c.title}</span>
                            <span class="carousel-loc">
                                <i class="fa-solid fa-location-dot" style="color:var(--primary)"></i> 
                                ${this.getUcName(c.uc)} - ${c.village}
                            </span>
                        </div>
                    </div>
                `).join('')}
            </div>

            <!-- Ongoing Government projects -->
            <div class="section-title-bar" style="margin-top:10px;">
                <h3>جاري ترقياتي منصوبا</h3>
                <a onclick="app.navigateTo('projects')">سڀ ڏسو</a>
            </div>
            <div class="ongoing-list">
                ${this.db.projects.slice(0, 2).map(p => `
                    <div class="ongoing-item" onclick="app.navigateTo('projects')">
                        <div class="ongoing-details">
                            <span class="ongoing-name">${p.title}</span>
                            <div class="ongoing-progress-bar">
                                <div class="ongoing-progress-fill" style="width: ${p.progress}%"></div>
                            </div>
                        </div>
                        <span class="ongoing-pct">${p.progress}%</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderAddComplaint() {
        return `
            <div class="section-title-bar">
                <h3>نئين شڪايت داخل ڪريو</h3>
            </div>
            
            <div class="glass-card" style="display:flex; flex-direction:column; gap:14px;">
                <!-- Upload selector -->
                <div id="image-picker-zone" class="image-upload-card" onclick="document.getElementById('image-file-input').click()">
                    <i class="fa-solid fa-camera-retro"></i>
                    <span style="font-size:0.85rem; font-weight:600;">تصوير اپلوڊ ڪريو يا ڪئميرا کوليو</span>
                    <span style="font-size:0.65rem; color:var(--text-muted);">Gemini AI فوراً مسئلو سڃاڻي وٺندو</span>
                </div>
                
                <input type="file" id="image-file-input" style="display:none;" accept="image/*" onchange="app.handleImageSelection(this)">
                
                <div id="image-preview-area" class="hidden"></div>
                
                <!-- Gemini AI Scan panel -->
                <div id="ai-processing-panel" class="ai-audit-panel hidden">
                    <div class="ai-audit-header">
                        <i class="fa-solid fa-microchip-ai"></i>
                        <span>Gemini AI تصوير جو معائنو ڪري رهيو آهي...</span>
                    </div>
                </div>

                <div class="form-group">
                    <label>شڪايت جو موضوع / عنوان</label>
                    <input type="text" id="comp-title" placeholder="عنوان لکو، مثال: پاڻي جي کوٽ" class="form-control">
                </div>

                <div class="form-group">
                    <label>ڪيٽيگري چونڊيو</label>
                    <div class="category-grid">
                        ${Object.keys(this.db.categories).map(catKey => {
                            const cat = this.db.categories[catKey];
                            return `
                                <button class="cat-select-btn" data-cat="${catKey}" onclick="app.selectCategory('${catKey}', this)">
                                    <i class="fa-solid ${cat.icon}"></i>
                                    <span>${cat.label}</span>
                                </button>
                            `;
                        }).join('')}
                    </div>
                </div>

                <div class="form-group">
                    <label>يونين ڪائونسل</label>
                    <select id="comp-uc" class="form-control">
                        ${this.db.unionCouncils.map(uc => `<option value="${uc.id}">${uc.name}</option>`).join('')}
                    </select>
                </div>

                <div class="form-group">
                    <label>ڳوٺ / علائقو / محلو</label>
                    <input type="text" id="comp-village" placeholder="ڳوٺ يا گهٽي جو نالو لکو" class="form-control">
                </div>

                <div class="form-group">
                    <label>شڪايت جي تفصيلي وضاحت</label>
                    <textarea id="comp-desc" rows="3" placeholder="مسئلي بابت تفصيلي معلومات لکو..." class="form-control"></textarea>
                </div>

                <div class="form-group">
                    <label>GPS لوڪيشن</label>
                    <div style="display:flex; gap:8px;">
                        <input type="text" id="comp-gps" readonly placeholder="حاصلا حاصل ٿيل ناهن" class="form-control" style="font-family:'Outfit'; flex:1;">
                        <button class="btn-secondary" onclick="app.simulateGps()" style="width:auto; padding: 0 15px;"><i class="fa-solid fa-location-crosshairs"></i></button>
                    </div>
                </div>

                <button class="btn-primary" onclick="app.submitComplaint()" style="margin-top:10px;">شڪايت داخل ڪريو</button>
            </div>
        `;
    }

    renderComplaintDetail(compId) {
        const comp = this.db.complaints.find(c => c.id === compId);
        if (!comp) return `<div>شڪايت نه ملي سگهي.</div>`;

        // Check if current user voted
        const userVoted = comp.votedUsers && comp.votedUsers.includes(this.currentUser.id);

        return `
            <div class="section-title-bar">
                <a onclick="app.navigateTo('complaints')" style="color:var(--text); font-size:1.1rem;"><i class="fa-solid fa-chevron-right"></i> واپس</a>
                <h3>شڪايت جا تفصيل</h3>
            </div>
            
            <div class="glass-card" style="display:flex; flex-direction:column; gap:14px;">
                <div class="detail-img-header">
                    <img src="${comp.image}" class="detail-img" alt="Complaint Image">
                    <span class="detail-status-floating badge-status ${this.getStatusBadgeClass(comp.status)}">
                        ${this.getStatusLabel(comp.status)}
                    </span>
                </div>
                
                <div class="detail-card-body">
                    <h3 style="font-size:1.05rem; font-weight:700;">${comp.title}</h3>
                    
                    <div class="detail-meta-row">
                        <span><i class="fa-regular fa-calendar"></i> ${new Date(comp.createdAt).toLocaleDateString('sd-PK')}</span>
                        <span><i class="fa-solid fa-location-dot"></i> ${this.getUcName(comp.uc)} - ${comp.village}</span>
                    </div>

                    <div class="detail-desc">
                        ${comp.desc}
                    </div>

                    <!-- Gemini AI summary audit card -->
                    <div class="detail-ai-summary">
                        <strong style="color:#2dd4bf;"><i class="fa-solid fa-wand-magic-sparkles"></i> Gemini AI خلاصو:</strong>
                        <p style="margin-top:4px;">${comp.summary || 'خلاصو تيار ٿي رهيو آهي...'}</p>
                    </div>

                    <!-- Citizen vote verification -->
                    <div class="votes-verification">
                        <div class="vote-info">
                            <span><i class="fa-solid fa-thumbs-up" style="color:var(--primary)"></i> <strong>${comp.votes}</strong> شهرين تصديق ڪئي</span>
                        </div>
                        <div class="vote-action-btns">
                            <button class="vote-btn-sm ${userVoted ? 'voted-up' : ''}" onclick="app.voteComplaint('${comp.id}')">
                                <i class="fa-solid fa-check"></i> تصديق ڪريو
                            </button>
                        </div>
                    </div>

                    <!-- Public Comments -->
                    <div class="comments-container">
                        <span class="comments-title"><i class="fa-regular fa-comments"></i> عوامي راءِ (${comp.comments ? comp.comments.length : 0})</span>
                        
                        <div class="comment-input-wrap">
                            <input type="text" id="new-comment-text" placeholder="رايو لکو..." class="form-control" style="font-size:0.8rem;">
                            <button class="btn-primary" onclick="app.addComment('${comp.id}')" style="width:auto; padding:0 15px;"><i class="fa-solid fa-paper-plane"></i></button>
                        </div>

                        <div class="comment-list" id="comment-list-container">
                            ${comp.comments && comp.comments.length > 0 ? 
                                comp.comments.map(c => `
                                    <div class="comment-item">
                                        <div class="comment-content">
                                            <span class="comment-user">${c.user}</span>
                                            <span class="comment-txt">${c.txt}</span>
                                        </div>
                                        <span class="comment-time">${c.time}</span>
                                    </div>
                                `).join('') : `<p style="font-size:0.75rem; color:var(--text-muted); text-align:center;">هن شڪايت تي ڪو به رايو ناهي ڏنو ويو.</p>`
                            }
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderComplaintsFeed() {
        return `
            <div class="search-filter-panel">
                <div class="search-wrap">
                    <input type="text" id="feed-search" placeholder="شڪايت يا علائقو ڳوليو..." class="form-control" onkeyup="app.filterComplaintsFeed()">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </div>
                
                <div class="filter-tags">
                    <button class="tag-btn active" data-filter="all" onclick="app.changeFeedFilter('all', this)">سڀ شڪايتون</button>
                    <button class="tag-btn" data-filter="pending" onclick="app.changeFeedFilter('pending', this)">انتظار ۾</button>
                    <button class="tag-btn" data-filter="progress" onclick="app.changeFeedFilter('progress', this)">جاري</button>
                    <button class="tag-btn" data-filter="resolved" onclick="app.changeFeedFilter('resolved', this)">حل ٿيل</button>
                </div>
            </div>

            <div class="complaints-feed-list" id="feed-list-target">
                <!-- Dynamic cards insertion -->
                ${this.renderFeedCards(this.db.complaints)}
            </div>
        `;
    }

    renderFeedCards(list) {
        if (list.length === 0) {
            return `<div class="glass-card" style="text-align:center; padding:30px; color:var(--text-muted);">ڪا به شڪايت نه ملي.</div>`;
        }
        return list.map(c => `
            <div class="glass-card complaint-feed-card" onclick="app.navigateTo('complaint-detail', '${c.id}')">
                <div class="feed-card-img-wrap">
                    <img src="${c.image}" class="feed-card-img" alt="Issue">
                </div>
                <div class="feed-card-body">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span class="feed-card-title">${c.title}</span>
                        <span class="badge-status ${this.getStatusBadgeClass(c.status)}" style="font-size:0.6rem; padding: 2px 8px;">
                            ${this.getStatusLabel(c.status)}
                        </span>
                    </div>
                    <p class="feed-card-desc">${c.desc}</p>
                    <div class="feed-card-meta">
                        <span style="font-size:0.7rem; color:var(--text-muted);">
                            <i class="fa-solid fa-location-dot"></i> ${this.getUcName(c.uc)}
                        </span>
                        <span style="font-size:0.7rem; font-weight:600; color:var(--primary);">
                            <i class="fa-solid fa-thumbs-up"></i> ${c.votes} تصديقون
                        </span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderUcStats(selectedUcId = null) {
        const ucs = [...this.db.unionCouncils].sort((a,b) => b.resolvedRate - a.resolvedRate);
        return `
            <div class="section-title-bar">
                <h3>يونين ڪائونسل انگ اکر ۽ ڪارڪردگي</h3>
            </div>
            
            <div class="uc-stats-header glass-card" style="background:linear-gradient(135deg, rgba(16,185,129,0.06) 0%, rgba(13,148,136,0.02) 100%);">
                <h4 style="font-size:0.9rem; font-weight:700; color:var(--success);"><i class="fa-solid fa-circle-nodes"></i> ميهڙ تعلقي جي بهترين ڪارڪردگي</h4>
                <p style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">سڀني يو سيز جي شڪايتن جي حل ٿيڻ جي شرح مطابق درجه بندي.</p>
            </div>

            <div class="uc-list-grid">
                ${ucs.map((uc, index) => {
                    const activeComplaintsCount = this.db.complaints.filter(c => c.uc === uc.id).length;
                    return `
                        <div class="glass-card uc-card-item" onclick="app.showUcDetailModal('${uc.id}')">
                            <div class="uc-info">
                                <span class="uc-name">${index + 1}. ${uc.name}</span>
                                <span class="uc-subtext">کل آبادي: ${uc.population} | شڪايتون: ${activeComplaintsCount}</span>
                            </div>
                            <div class="uc-bar-wrap">
                                <span class="uc-percent">${uc.resolvedRate}%</span>
                                <div class="uc-progress-outer">
                                    <div class="uc-progress-inner" style="width: ${uc.resolvedRate}%; background: ${uc.color}"></div>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            
            <div id="uc-modal-placeholder"></div>
        `;
    }

    renderSocialFeed() {
        // Social workers posts
        return `
            <div class="section-title-bar">
                <h3>سماجي آگاهي فيڊ (Social Worker Hub)</h3>
            </div>

            ${this.currentUser.role === 'worker' || this.currentUser.role === 'admin' || this.currentUser.role === 'superadmin' ? `
                <div class="glass-card social-composer">
                    <textarea id="social-post-text" placeholder="برادري يا ترقياتي ڪمن بابت ڪا معلومات ونڊيو..." class="form-control" style="font-size:0.8rem;"></textarea>
                    <button class="btn-primary" onclick="app.createSocialPost()" style="width:auto; padding:0 20px;"><i class="fa-solid fa-paper-plane"></i> ونڊيو</button>
                </div>
            ` : ''}

            <div class="social-feed-list">
                <div class="glass-card social-post-card">
                    <div class="post-header">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="" class="avatar-sm">
                        <div class="post-header-info">
                            <span class="post-author">سجاد علي چانڊيو</span>
                            <span class="post-badge">سماجي رهنما</span>
                        </div>
                        <span style="font-size:0.65rem; color:var(--text-muted); margin-right:auto;">3 ڪلاڪ اڳ</span>
                    </div>
                    <p class="post-content">اڄ اسان جي ٽيم پاران يوسي ميهڙ 2 وارڊ نمبر 3 ۾ ڪچرو کڻڻ ۽ صفائي جي خاص مهم هلائي وئي. سڀني شهرين کي درخواست آهي ته ميهڙ کي صاف رکڻ ۾ اسان سان هٿ ونڊائين.</p>
                    <img src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=500&auto=format&fit=crop&q=80" class="post-image" alt="Post attachment">
                    <div class="post-footer">
                        <span class="post-action" onclick="app.likePost(this)"><i class="fa-regular fa-heart"></i> <span>14</span> پسنديون</span>
                        <span class="post-action"><i class="fa-regular fa-comment"></i> 4 رايا</span>
                    </div>
                </div>
                
                <div class="glass-card social-post-card">
                    <div class="post-header">
                        <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80" alt="" class="avatar-sm">
                        <div class="post-header-info">
                            <span class="post-author">ٽائون ڪميٽي ميهڙ</span>
                            <span class="post-badge" style="background:rgba(59, 130, 246, 0.15); color:var(--info);">سرڪاري اعلان</span>
                        </div>
                        <span style="font-size:0.65rem; color:var(--text-muted); margin-right:auto;">1 ڏينهن اڳ</span>
                    </div>
                    <p class="post-content">مکيه باءِ پاس روڊ جي مرمت جو ڪم تيزيءَ سان جاري آهي. متبادل رستن طور شهرين کي بند روڊ استعمال ڪرڻ جي اپيل ڪجي ٿي.</p>
                    <div class="post-footer">
                        <span class="post-action" onclick="app.likePost(this)"><i class="fa-regular fa-heart"></i> <span>28</span> پسنديون</span>
                        <span class="post-action"><i class="fa-regular fa-comment"></i> 2 رايا</span>
                    </div>
                </div>
            </div>
        `;
    }

    renderProjectsTracker() {
        return `
            <div class="section-title-bar">
                <h3>ترقياتي منصوبن جي نگراني (Development Tracker)</h3>
            </div>
            
            <div class="uc-stats-header glass-card" style="background:linear-gradient(135deg, rgba(14,165,233,0.06) 0%, rgba(13,148,136,0.02) 100%);">
                <h4 style="font-size:0.9rem; font-weight:700; color:#0ea5e9;"><i class="fa-solid fa-circle-info"></i> سرڪاري بجيٽ ۽ ڪم جي نگراني</h4>
                <p style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">ميهڙ ۾ جاري سرڪاري منصوبن جي بجيٽ ۽ فيصد ترقي شفاف طريقي سان ڏسو.</p>
            </div>

            <div style="display:flex; flex-direction:column; gap:12px;">
                ${this.db.projects.map(p => `
                    <div class="glass-card project-card">
                        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                            <span class="project-title">${p.title}</span>
                            <span class="badge-status" style="background:rgba(14,165,233,0.15); color:#0ea5e9; font-size:0.6rem;">${this.getUcName(p.uc)}</span>
                        </div>
                        <div class="project-meta-grid">
                            <span><strong>ٺيڪيدار:</strong> ${p.contractor}</span>
                            <span><strong>بجيٽ:</strong> ${p.budget}</span>
                            <span><strong>شروع:</strong> ${p.start}</span>
                            <span><strong>تڪميل:</strong> ${p.end}</span>
                        </div>
                        <div style="margin-top:6px;">
                            <div style="display:flex; justify-content:space-between; font-size:0.75rem; margin-bottom:4px;">
                                <span>ڪم جي رفتار</span>
                                <strong>${p.progress}%</strong>
                            </div>
                            <div class="ongoing-progress-bar" style="width:100%;">
                                <div class="ongoing-progress-fill" style="width: ${p.progress}%; background: linear-gradient(90deg, #0ea5e9 0%, #06b6d4 100%);"></div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderVotingSurveys() {
        return `
            <div class="section-title-bar">
                <h3>عوامي راءِ ۽ فيصلا (Surveys & Voting)</h3>
            </div>
            
            <div class="uc-stats-header glass-card" style="background:linear-gradient(135deg, rgba(245,158,11,0.06) 0%, rgba(13,148,136,0.02) 100%); mb-10">
                <h4 style="font-size:0.9rem; font-weight:700; color:var(--secondary);"><i class="fa-solid fa-vote-yea"></i> فيصلن ۾ عوامي شرڪت</h4>
                <p style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">ميهڙ جي ترقياتي ڪمن بابت پنهنجي ووٽ جو حق استعمال ڪريو.</p>
            </div>

            <div style="display:flex; flex-direction:column; gap:12px; margin-top:12px;">
                ${this.db.surveys.map(s => {
                    const totalVotes = s.options.reduce((sum, opt) => sum + opt.votes, 0);
                    const userVoted = s.votedUsers.includes(this.currentUser.id);
                    return `
                        <div class="glass-card survey-card" id="survey-box-${s.id}">
                            <span class="survey-question">${s.question}</span>
                            <div class="survey-options">
                                ${s.options.map((opt, optIndex) => {
                                    const pct = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
                                    return `
                                        <button class="survey-opt-btn" onclick="app.submitSurveyVote('${s.id}', ${optIndex})">
                                            <div class="survey-opt-bg" style="width: ${userVoted ? pct : 0}%"></div>
                                            <div class="survey-opt-text">
                                                <span>${opt.text}</span>
                                                ${userVoted ? `<strong>${pct}% (${opt.votes})</strong>` : ''}
                                            </div>
                                        </button>
                                    `;
                                }).join('')}
                            </div>
                            <span style="font-size:0.65rem; color:var(--text-muted); text-align:left;">ڪل ووٽ: ${totalVotes}</span>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    renderUserProfile() {
        // Count complaints for this user
        const myComplaints = this.db.complaints.filter(c => c.user === this.currentUser.name || c.user === 'مهمان شهري');
        return `
            <div class="glass-card profile-card">
                <div class="profile-avatar-wrap">
                    <img src="${this.currentUser.avatar}" alt="User Avatar" class="profile-avatar">
                </div>
                <h3 style="font-size:1.1rem; font-weight:700; margin-top:5px;">${this.currentUser.name}</h3>
                <span style="font-size:0.75rem; color:var(--text-muted);">${this.getRoleLabel(this.currentUser.role)}</span>
                
                <div class="achievement-badges">
                    <span class="achievement-badge"><i class="fa-solid fa-shield-halved"></i> ${this.currentUser.badge}</span>
                    <span class="achievement-badge" style="background:rgba(13,148,136,0.1); color:var(--primary); border-color:rgba(13,148,136,0.2)">
                        <i class="fa-solid fa-award"></i> ${this.currentUser.points} پوائنٽس
                    </span>
                </div>
            </div>

            <div class="section-title-bar" style="margin-top:10px;">
                <h3>منهنجي سرگرمي / شڪايتون (${myComplaints.length})</h3>
            </div>
            
            <div class="complaints-feed-list">
                ${myComplaints.length > 0 ? this.renderFeedCards(myComplaints) : `
                    <p style="font-size:0.8rem; text-align:center; color:var(--text-muted); padding:20px;">توهان اڃا تائين ڪا به شڪايت داخل ناهي ڪئي.</p>
                `}
            </div>
        `;
    }

    renderNotifications() {
        return `
            <div class="section-title-bar">
                <h3>نوٽيفڪيشنز</h3>
                <a onclick="app.markAllNotificationsRead()" style="font-size:0.75rem;">سڀ پڙهيل نشان لڳايو</a>
            </div>
            
            <div class="notifications-list">
                ${this.db.notifications.map(n => `
                    <div class="notif-card ${n.read ? '' : 'unread'}" onclick="app.readNotification('${n.id}')">
                        <div class="notif-icon">
                            <i class="fa-solid fa-bell"></i>
                        </div>
                        <div class="notif-body">
                            <span class="notif-text">${n.text}</span>
                            <span class="notif-time">${n.time}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderMenuScreen() {
        return `
            <div class="section-title-bar">
                <h3>پورٽل مينيو</h3>
            </div>
            
            <div class="menu-grid">
                <div class="glass-card menu-card" onclick="app.navigateTo('directory')">
                    <i class="fa-solid fa-phone-volume"></i>
                    <span>مدد ۽ رابطا</span>
                </div>
                <div class="glass-card menu-card" onclick="app.navigateTo('voting')">
                    <i class="fa-solid fa-square-poll-horizontal"></i>
                    <span>سروي ۽ ووٽنگ</span>
                </div>
                <div class="glass-card menu-card" onclick="app.navigateTo('uc-stats')">
                    <i class="fa-solid fa-chart-line"></i>
                    <span>يو سي انگ اکر</span>
                </div>
                <div class="glass-card menu-card" onclick="app.navigateTo('social')">
                    <i class="fa-solid fa-users"></i>
                    <span>سماجي آگاهي</span>
                </div>
                <div class="glass-card menu-card" onclick="app.navigateTo('settings')">
                    <i class="fa-solid fa-sliders"></i>
                    <span>سيٽنگون</span>
                </div>
                <div class="glass-card menu-card" onclick="app.navigateTo('profile')">
                    <i class="fa-solid fa-id-card"></i>
                    <span>منهنجو پروفائيل</span>
                </div>
            </div>

            ${this.currentUser.role === 'admin' || this.currentUser.role === 'superadmin' ? `
                <div class="section-title-bar" style="margin-top:10px;">
                    <h3>ايڊمن انتظاميه</h3>
                </div>
                <div class="menu-grid">
                    <div class="glass-card menu-card" onclick="app.navigateTo('admin-dashboard')" style="border-color:rgba(168,85,247,0.3)">
                        <i class="fa-solid fa-chart-pie" style="color:#a855f7"></i>
                        <span style="color:#a855f7">ايڊمن ڊيش بورڊ</span>
                    </div>
                    <div class="glass-card menu-card" onclick="app.navigateTo('admin-moderation')" style="border-color:rgba(168,85,247,0.3)">
                        <i class="fa-solid fa-circle-check" style="color:#a855f7"></i>
                        <span style="color:#a855f7">شڪايتن جي جاچ</span>
                    </div>
                    <div class="glass-card menu-card" onclick="app.navigateTo('admin-users')" style="border-color:rgba(168,85,247,0.3)">
                        <i class="fa-solid fa-user-gear" style="color:#a855f7"></i>
                        <span style="color:#a855f7">يوزر انتظاميا</span>
                    </div>
                    <div class="glass-card menu-card" onclick="app.navigateTo('admin-reports')" style="border-color:rgba(168,85,247,0.3)">
                        <i class="fa-solid fa-file-invoice" style="color:#a855f7"></i>
                        <span style="color:#a855f7">رپورٽون حاصل ڪريو</span>
                    </div>
                </div>
            ` : ''}

            <button class="btn-danger" onclick="app.logoutUser()" style="margin-top:15px; padding:12px;">
                <i class="fa-solid fa-right-from-bracket"></i> لاگ آئوٽ ڪريو
            </button>
        `;
    }

    renderAdminDashboard() {
        const total = this.db.complaints.length;
        const pending = this.db.complaints.filter(c => c.status === 'pending').length;
        const active = this.db.complaints.filter(c => c.status === 'progress' || c.status === 'approved').length;
        const resolved = this.db.complaints.filter(c => c.status === 'resolved').length;

        return `
            <div class="section-title-bar">
                <a onclick="app.navigateTo('menu')" style="color:var(--text); font-size:1.1rem;"><i class="fa-solid fa-chevron-right"></i> واپس</a>
                <h3>ايڊمن ڊيش بورڊ</h3>
            </div>

            <div class="admin-summary-grid">
                <div class="admin-summary-card">
                    <div class="val">${total}</div>
                    <div class="lbl">ڪل شڪايتون</div>
                </div>
                <div class="admin-summary-card" style="border-color:rgba(245,158,11,0.3)">
                    <div class="val" style="color:var(--warning)">${pending}</div>
                    <div class="lbl">انتظار ۾</div>
                </div>
                <div class="admin-summary-card" style="border-color:rgba(16,185,129,0.3)">
                    <div class="val" style="color:var(--success)">${resolved}</div>
                    <div class="lbl">حل ٿيل</div>
                </div>
            </div>

            <div class="admin-section">
                <h4>شڪايتن جي نوعيت (ڪيٽيگري وائيز تجزيو)</h4>
                <div class="glass-card" style="display:flex; flex-direction:column; gap:10px;">
                    ${Object.keys(this.db.categories).map(catKey => {
                        const label = this.db.categories[catKey].label;
                        const count = this.db.complaints.filter(c => c.category === catKey).length;
                        const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                        return `
                            <div style="display:flex; align-items:center; justify-content:space-between; font-size:0.75rem;">
                                <span>${label} (${count})</span>
                                <div style="display:flex; align-items:center; gap:8px; width:60%;">
                                    <div class="uc-progress-outer" style="flex:1;">
                                        <div class="uc-progress-inner" style="width: ${pct}%; background:var(--primary);"></div>
                                    </div>
                                    <span style="font-family:'Outfit'; font-weight:700;">${pct}%</span>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>

            <div class="admin-section">
                <h4>تازيون سرگرميون (Recent Actions)</h4>
                <div class="glass-card" style="display:flex; flex-direction:column; gap:8px; font-size:0.75rem;">
                    ${this.db.activityLogs.map(log => `
                        <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--border); padding-bottom:6px;">
                            <span><strong>${log.user}:</strong> ${log.action}</span>
                            <span style="color:var(--text-muted);">${log.time}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderAdminModeration() {
        const pendingComplaints = this.db.complaints.filter(c => c.status === 'pending');
        return `
            <div class="section-title-bar">
                <a onclick="app.navigateTo('menu')" style="color:var(--text); font-size:1.1rem;"><i class="fa-solid fa-chevron-right"></i> واپس</a>
                <h3>شڪايتن جي جاچ (Moderation Queue)</h3>
            </div>
            
            <div class="complaints-feed-list">
                ${pendingComplaints.length > 0 ? pendingComplaints.map(c => `
                    <div class="glass-card mod-item-card" id="mod-card-${c.id}">
                        <div style="display:flex; gap:12px;">
                            <img src="${c.image}" alt="" style="width:80px; height:80px; border-radius:10px; object-fit:cover;">
                            <div style="display:flex; flex-direction:column; gap:4px; min-width:0; flex:1;">
                                <h4 style="font-size:0.85rem; font-weight:700; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${c.title}</h4>
                                <span style="font-size:0.7rem; color:var(--text-muted);"><i class="fa-solid fa-location-dot"></i> ${this.getUcName(c.uc)} - ${c.village}</span>
                                <span style="font-size:0.7rem; color:var(--primary); font-weight:600;"><i class="fa-solid fa-wand-magic-sparkles"></i> AI معتدل: ڪو دوکو ناهي</span>
                            </div>
                        </div>
                        <p style="font-size:0.75rem; line-height:1.4;">${c.desc}</p>
                        
                        <div class="mod-action-row">
                            <button class="btn-primary" onclick="app.approveComplaint('${c.id}')" style="padding:8px;"><i class="fa-solid fa-check"></i> منظور ڪريو</button>
                            <button class="btn-danger" onclick="app.rejectComplaint('${c.id}')" style="padding:8px;"><i class="fa-solid fa-xmark"></i> رد ڪريو</button>
                        </div>
                        <button class="btn-secondary" onclick="app.resolveComplaintDirectly('${c.id}')" style="padding:8px;"><i class="fa-solid fa-circle-check"></i> حل ٿيل مارڪ ڪريو</button>
                    </div>
                `).join('') : `
                    <div class="glass-card" style="text-align:center; padding:30px; color:var(--text-muted);">جاچ لاءِ ڪا به شڪايت باقي ناهي.</div>
                `}
            </div>
        `;
    }

    renderAdminUsers() {
        return `
            <div class="section-title-bar">
                <a onclick="app.navigateTo('menu')" style="color:var(--text); font-size:1.1rem;"><i class="fa-solid fa-chevron-right"></i> واپس</a>
                <h3>يوزر رول ۽ انتظاميا</h3>
            </div>
            
            <div class="user-list">
                ${this.db.users.map(u => `
                    <div class="glass-card user-item-card">
                        <div style="display:flex; align-items:center; gap:10px;">
                            <img src="${u.avatar}" class="avatar-sm" alt="">
                            <div style="display:flex; flex-direction:column;">
                                <span style="font-size:0.85rem; font-weight:700;">${u.name}</span>
                                <span style="font-size:0.7rem; color:var(--text-muted); font-family:'Outfit';">${u.phone}</span>
                            </div>
                        </div>
                        <select class="user-role-select" onchange="app.changeUserRole('${u.id}', this.value)">
                            <option value="citizen" ${u.role === 'citizen' ? 'selected' : ''}>شهري</option>
                            <option value="worker" ${u.role === 'worker' ? 'selected' : ''}>ورڪر</option>
                            <option value="admin" ${u.role === 'admin' ? 'selected' : ''}>ايڊمن</option>
                            <option value="superadmin" ${u.role === 'superadmin' ? 'selected' : ''}>سپر ايڊمن</option>
                        </select>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderAdminReports() {
        return `
            <div class="section-title-bar">
                <a onclick="app.navigateTo('menu')" style="color:var(--text); font-size:1.1rem;"><i class="fa-solid fa-chevron-right"></i> واپس</a>
                <h3>شڪايتون رپورٽون حاصل ڪريو</h3>
            </div>
            
            <div class="reports-grid">
                <div class="glass-card report-export-card" onclick="app.exportReport('csv')">
                    <i class="fa-solid fa-file-csv"></i>
                    <h5>Excel / CSV لسٽ</h5>
                    <p>شڪايتن جي تفصيلي فهرست ڊائون لوڊ ڪريو</p>
                </div>
                <div class="glass-card report-export-card" onclick="app.exportReport('pdf')">
                    <i class="fa-solid fa-file-pdf" style="color:#ef4444;"></i>
                    <h5>PDF خلاصو رپورٽ</h5>
                    <p>ميهڙ شڪايتن جي خلاصي پرنٽ حاصل ڪريو</p>
                </div>
            </div>

            <div class="admin-section" style="margin-top:15px;">
                <h4>Gemini AI پاران شهر جي مسئلن جو سڄو تجزيو</h4>
                <div class="glass-card" style="font-size:0.8rem; line-height:1.6; display:flex; flex-direction:column; gap:10px;">
                    <p><strong><i class="fa-solid fa-lightbulb" style="color:var(--secondary);"></i> AI تجويزون:</strong></p>
                    <p>1. يوسي ميهڙ 1 ۾ نيڪال آب جون شڪايتون سڀ کان وڌيڪ آهن (42%). ترجيحي بنيادن تي گٽر سسٽم جي نئين سر تعمير جي ضرورت آهي.</p>
                    <p>2. سول اسپتال روڊ تي اسٽريٽ لائيٽن جي ناڪاره هجڻ ڪري سيڪيورٽي خطرا وڌي رهيا آهن. اتي فوري روشنيءَ جو بندوبست ڪيو وڃي.</p>
                </div>
            </div>
        `;
    }

    renderSettings() {
        const isLightTheme = document.body.classList.contains("light-theme");
        return `
            <div class="section-title-bar">
                <a onclick="app.navigateTo('menu')" style="color:var(--text); font-size:1.1rem;"><i class="fa-solid fa-chevron-right"></i> واپس</a>
                <h3>سسٽم سيٽنگون</h3>
            </div>

            <div class="settings-list">
                <div class="glass-card settings-item">
                    <div class="settings-info">
                        <span class="settings-title">ڳڙهي / لائٽ موڊ (Light Mode)</span>
                        <span class="settings-desc">ايپليڪيشن جو ٿيم تبديل ڪريو</span>
                    </div>
                    <label class="switch">
                        <input type="checkbox" id="theme-switch-btn" ${isLightTheme ? 'checked' : ''} onchange="app.toggleTheme(this)">
                        <span class="slider"></span>
                    </label>
                </div>

                <div class="glass-card settings-item">
                    <div class="settings-info">
                        <span class="settings-title">ٻولي (Language)</span>
                        <span class="settings-desc">سنڌي (Sindhi) - Default RTL</span>
                    </div>
                    <strong style="color:var(--primary); font-size:0.8rem;">سنڌي (RTL)</strong>
                </div>

                <div class="glass-card settings-item">
                    <div class="settings-info">
                        <span class="settings-title">Firebase Credentials Config</span>
                        <span class="settings-desc">حقيقي ڊيٽابيس سان ڳنڍڻ لاءِ API Key لکو</span>
                    </div>
                </div>
                
                <div class="glass-card" style="display:flex; flex-direction:column; gap:10px; margin-top:-5px;">
                    <div class="form-group">
                        <label>Firebase API Key</label>
                        <input type="text" placeholder="AIzaSyA..." class="form-control" style="font-family:'Outfit'; font-size:0.75rem;">
                    </div>
                    <div class="form-group">
                        <label>Project ID</label>
                        <input type="text" placeholder="mehar-town-pwa" class="form-control" style="font-family:'Outfit'; font-size:0.75rem;">
                    </div>
                    <button class="btn-primary" onclick="app.saveFirebaseConfig()" style="padding:10px; font-size:0.8rem;">محفوظ ڪريو</button>
                </div>

                <button class="btn-secondary" onclick="app.resetDatabase()" style="color:var(--danger); border-color:rgba(239,68,68,0.2); background:rgba(239,68,68,0.02); margin-top:10px;">
                    <i class="fa-solid fa-trash-arrow-up"></i> سسٽم ريسٽ ڪريو (localStorage Clear)
                </button>
            </div>
        `;
    }

    // Dynamic UI loaders and handlers
    onScreenLoaded(screenId, params) {
        if (screenId === "map") {
            this.initLeafletMap();
        }
    }

    initLeafletMap() {
        // Safe check to destroy previous map reference
        if (this.activeMap) {
            this.activeMap.remove();
            this.activeMap = null;
        }

        setTimeout(() => {
            try {
                // Initialize map centered at Mehar coordinates
                this.activeMap = L.map('map-element', {
                    zoomControl: false,
                    attributionControl: false
                }).setView([27.1772, 67.8229], 14);

                // Add standard OpenStreetMap tiles
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19
                }).addTo(this.activeMap);

                // Populate with Complaint Markers
                this.db.complaints.forEach(c => {
                    if (c.coords && c.coords.length === 2) {
                        const markerColor = this.getMarkerColorByStatus(c.status);
                        const customIcon = L.divIcon({
                            className: 'custom-div-icon',
                            html: `<div style="background-color:${markerColor}; width:15px; height:15px; border-radius:50%; border:2px solid white; box-shadow:0 0 5px rgba(0,0,0,0.5)"></div>`,
                            iconSize: [15, 15],
                            iconAnchor: [7, 7]
                        });

                        const marker = L.marker(c.coords, { icon: customIcon }).addTo(this.activeMap);
                        marker.bindPopup(`
                            <div class="map-popup-card">
                                <img src="${c.image}" class="map-popup-img" alt="">
                                <span class="map-popup-title">${c.title}</span>
                                <span style="font-size:0.6rem; color:gray;"><i class="fa-solid fa-location-dot"></i> ${this.getUcName(c.uc)}</span>
                                <a onclick="app.navigateTo('complaint-detail', '${c.id}')" class="map-popup-btn">تفصيل ڏسو</a>
                            </div>
                        `);
                    }
                });

                // Populate with Projects
                const projCoordinates = [
                    [27.1850, 67.8300], // Bypass road
                    [27.1650, 67.8100], // RO water filter plant
                    [27.1900, 67.8200]  // PHC Faridabad
                ];

                this.db.projects.forEach((p, idx) => {
                    const coords = projCoordinates[idx] || [27.1772, 67.8229];
                    const customIcon = L.divIcon({
                        className: 'custom-div-icon',
                        html: `<div style="background-color:#3b82f6; width:15px; height:15px; border-radius:50%; border:2px solid white; box-shadow:0 0 5px rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-gears" style="color:white; font-size:8px;"></i></div>`,
                        iconSize: [15, 15],
                        iconAnchor: [7, 7]
                    });
                    const marker = L.marker(coords, { icon: customIcon }).addTo(this.activeMap);
                    marker.bindPopup(`
                        <div class="map-popup-card">
                            <span class="map-popup-title" style="color:var(--info)">${p.title}</span>
                            <span style="font-size:0.6rem; color:gray;">ٺيڪيدار: ${p.contractor}</span>
                            <span style="font-size:0.65rem; font-weight:700;">ترقي: ${p.progress}%</span>
                        </div>
                    `);
                });

                // Invalidate size to load tiles correctly inside scrollable container
                setTimeout(() => {
                    this.activeMap.invalidateSize();
                }, 200);

            } catch (err) {
                console.error("Leaflet map initialization failed: ", err);
            }
        }, 100);
    }

    getMarkerColorByStatus(status) {
        switch (status) {
            case "resolved": return "var(--success)";
            case "progress": return "#a855f7";
            default: return "var(--danger)";
        }
    }

    getStatusLabel(status) {
        switch (status) {
            case "pending": return "انتظار ۾";
            case "approved": return "منظور ٿيل";
            case "progress": return "جاري ڪم";
            case "resolved": return "حل ٿيل";
            case "rejected": return "رد ٿيل";
            default: return "نامعلوم";
        }
    }

    getStatusBadgeClass(status) {
        switch (status) {
            case "pending": return "badge-pending";
            case "approved": return "badge-approved";
            case "progress": return "badge-progress";
            case "resolved": return "badge-resolved";
            case "rejected": return "badge-rejected";
            default: return "";
        }
    }

    getUcName(ucId) {
        const uc = this.db.unionCouncils.find(u => u.id === ucId);
        return uc ? uc.name : "نامعلوم يو سي";
    }

    // Interactive simulators
    quickLogin(role) {
        this.currentUser = this.db.users.find(u => u.role === role);
        
        // Update Desktop sidebar active button matching
        const roleBtns = document.querySelectorAll(".role-btn");
        roleBtns.forEach(btn => {
            btn.classList.remove("active");
            if (btn.getAttribute("data-role") === role) {
                btn.classList.add("active");
            }
        });

        this.showToast(`ڀليڪار! توهان ${this.getRoleLabel(role)} طور داخل ٿي ويا آهيو.`, "success");
        this.navigateTo("home");
    }

    loginUser() {
        // Simulator login
        this.quickLogin("citizen");
    }

    registerUser() {
        const name = document.getElementById("reg-name").value.trim();
        const phone = document.getElementById("reg-phone").value.trim();
        const uc = document.getElementById("reg-uc").value;
        const village = document.getElementById("reg-village").value.trim();

        if (!name || !phone || !village) {
            this.showToast("مهرباني ڪري سڀ معلومات داخل ڪريو!", "danger");
            return;
        }

        const newUser = {
            id: `u_${Date.now()}`,
            name,
            phone,
            role: "citizen",
            uc,
            village,
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
            points: 10,
            badge: "نوآباد شهري"
        };

        this.db.users.push(newUser);
        this.currentUser = newUser;
        this.saveDb();

        this.showToast("رجسٽريشن ڪاميابيءَ سان مڪمل ٿي وئي!", "success");
        this.navigateTo("home");
    }

    logoutUser() {
        this.currentUser = this.db.users.find(u => u.role === 'citizen') || this.db.users[0];
        
        // Reset desktop side indicators
        const roleBtns = document.querySelectorAll(".role-btn");
        roleBtns.forEach(btn => {
            btn.classList.remove("active");
            if (btn.getAttribute("data-role") === 'citizen') {
                btn.classList.add("active");
            }
        });

        this.showToast("توهان لاگ آئوٽ ٿي ويا آهيو.", "info");
        this.navigateTo("splash");
    }

    selectCategory(catKey, btn) {
        this.selectedCategory = catKey;
        const btns = document.querySelectorAll(".cat-select-btn");
        btns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
    }

    handleImageSelection(input) {
        const file = input.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            this.uploadedImage = e.target.result;
            
            // Display Image Preview
            const pickerZone = document.getElementById("image-picker-zone");
            const previewArea = document.getElementById("image-preview-area");
            
            pickerZone.classList.add("hidden");
            previewArea.classList.remove("hidden");
            previewArea.innerHTML = `
                <div class="uploaded-preview-container">
                    <img src="${this.uploadedImage}" class="uploaded-preview-img">
                    <button class="remove-upload-btn" onclick="app.removeUploadedImage()"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;

            // Trigger simulated Gemini AI analysis
            this.simulateGeminiAiScan();
        };
        reader.readAsDataURL(file);
    }

    removeUploadedImage() {
        this.uploadedImage = null;
        document.getElementById("image-picker-zone").classList.remove("hidden");
        document.getElementById("image-preview-area").classList.add("hidden");
        document.getElementById("ai-processing-panel").classList.add("hidden");
        document.getElementById("image-file-input").value = "";
    }

    simulateGeminiAiScan() {
        const aiPanel = document.getElementById("ai-processing-panel");
        aiPanel.classList.remove("hidden");

        // Simple mock classification based on random timer
        setTimeout(() => {
            // Generate simulated scan response
            const mockCategories = ["cleansing", "water", "lights", "drainage"];
            const randomCategory = mockCategories[Math.floor(Math.random() * mockCategories.length)];
            
            let mockTitle = "";
            let mockDesc = "";
            let mockSummary = "";

            if (randomCategory === "cleansing") {
                mockTitle = "گلي ۾ ڪچري جا ڍير";
                mockDesc = "تصوير ۾ واضح طور ڏسي سگهجي ٿو ته محلي جي گهٽي ۾ ڪچري جا ڍير لڳل آهن، صفائي عملي کي گهرجي ته فوري قدم کڻي.";
                mockSummary = "ڪچري جو ڍير محلي ۾ گندگي ۽ بيماريون پکيڙي رهيو آهي.";
            } else if (randomCategory === "water") {
                mockTitle = "پاڻي جي پائيپ لائين ليڪيج";
                mockDesc = "پيئڻ جي پاڻي جي مکيه لائين ليڪ آهي جنهن ڪري پاڻي ضايع ٿي رهيو آهي ۽ گهٽي گپ سان ڀرجي وئي آهي.";
                mockSummary = "پاڻي جي پائيپ لائين ٽوڙ سبب پاڻي جي کوٽ ۽ رستي جي خرابي.";
            } else if (randomCategory === "lights") {
                mockTitle = "اسٽريٽ لائيٽ خراب هجڻ جي شڪايت";
                mockDesc = "اسٽريٽ لائيٽ بند هجڻ سبب رات جو علائقو اونداهو هجي ٿو ۽ چوريءَ جا واقعا وڌڻ جو انديشو آهي.";
                mockSummary = "بند اسٽريٽ لائيٽس اونداهي جو سبب بڻيل آهن.";
            } else {
                mockTitle = "نيڪال آب جو مسئلو";
                mockDesc = "نيڪال جو گندو پاڻي رستن تي بيهي ويو آهي. ناليون بند آهن ۽ صفائيءَ جي سخت ضرورت آهي.";
                mockSummary = "گندي پاڻي جو رستن تي جمع هجڻ سخت تڪليف جو سبب.";
            }

            // Autofill Form fields
            document.getElementById("comp-title").value = mockTitle;
            document.getElementById("comp-desc").value = mockDesc;
            
            // Set active category button
            const catBtn = document.querySelector(`.cat-select-btn[data-cat="${randomCategory}"]`);
            if (catBtn) {
                this.selectCategory(randomCategory, catBtn);
            }

            // Simulate GPS coordinates auto fill
            this.simulateGps();

            // Update AI audit panel showing output
            aiPanel.innerHTML = `
                <div class="ai-audit-header" style="color:var(--success);">
                    <i class="fa-solid fa-circle-check"></i>
                    <span>Gemini AI معائنو مڪمل:</span>
                </div>
                <p class="ai-audit-text"><strong>سڃاڻپ ٿيل مسئلو:</strong> ${this.db.categories[randomCategory].label}</p>
                <p class="ai-audit-text"><strong>AI خلاصو:</strong> ${mockSummary}</p>
                <p class="ai-audit-text" style="color:var(--success);"><i class="fa-solid fa-shield-halved"></i> تصوير معتدل آهي (No duplicates detected)</p>
            `;
            aiPanel.dataset.summary = mockSummary;

            this.showToast("Gemini AI تصوير مان مسئلو سڃاڻي ورتو آهي!", "success");

        }, 2200);
    }

    simulateGps() {
        const lat = (27.1700 + Math.random() * 0.02).toFixed(5);
        const lng = (67.8100 + Math.random() * 0.03).toFixed(5);
        this.selectedCoords = [parseFloat(lat), parseFloat(lng)];
        
        const gpsInput = document.getElementById("comp-gps");
        if (gpsInput) {
            gpsInput.value = `${lat}, ${lng}`;
        }
        this.showToast("GPS لوڪيشن ڪاميابيءَ سان حاصل ڪئي وئي!", "info");
    }

    submitComplaint() {
        const title = document.getElementById("comp-title").value.trim();
        const uc = document.getElementById("comp-uc").value;
        const village = document.getElementById("comp-village").value.trim();
        const desc = document.getElementById("comp-desc").value.trim();
        const gps = document.getElementById("comp-gps").value;
        const aiSummary = document.getElementById("ai-processing-panel").dataset.summary || "شڪايت جو خلاصو دستياب ناهي.";

        if (!title || !village || !desc || !this.selectedCategory) {
            this.showToast("مهرباني ڪري سڀئي خانا ڀريو ۽ ڪيٽيگري چونڊيو!", "danger");
            return;
        }

        const newComp = {
            id: `comp_${Date.now()}`,
            title,
            desc,
            category: this.selectedCategory,
            image: this.uploadedImage || "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=500&auto=format&fit=crop&q=80",
            uc,
            village,
            coords: this.selectedCoords,
            votes: 1,
            votedUsers: [this.currentUser.id],
            status: "pending",
            summary: aiSummary,
            comments: [],
            user: this.currentUser.name || "مهمان شهري",
            createdAt: new Date().toISOString()
        };

        // Prepend to Database Complaints
        this.db.complaints.unshift(newComp);
        this.saveDb();

        this.showToast("توهان جي شڪايت داخل ٿي وئي ۽ ايڊمن ڏانهن موڪلي وئي آهي!", "success");
        
        // Reset inputs
        this.uploadedImage = null;
        this.selectedCategory = null;

        // Redirect
        this.navigateTo("complaints");
    }

    voteComplaint(compId) {
        const comp = this.db.complaints.find(c => c.id === compId);
        if (!comp) return;

        if (!comp.votedUsers) comp.votedUsers = [];

        const index = comp.votedUsers.indexOf(this.currentUser.id);
        if (index > -1) {
            // Already voted, remove vote (simulate toggle)
            comp.votedUsers.splice(index, 1);
            comp.votes--;
            this.showToast("تصديق واپس ورتي وئي.", "info");
        } else {
            comp.votedUsers.push(this.currentUser.id);
            comp.votes++;
            this.showToast("مسئلي جي تصديق ڪئي وئي. مهرباني!", "success");
        }
        this.saveDb();
        this.navigateTo("complaint-detail", compId);
    }

    addComment(compId) {
        const txtEl = document.getElementById("new-comment-text");
        const txt = txtEl.value.trim();
        if (!txt) return;

        const comp = this.db.complaints.find(c => c.id === compId);
        if (!comp) return;

        if (!comp.comments) comp.comments = [];
        comp.comments.push({
            user: this.currentUser.name,
            txt: txt,
            time: "هاڻي"
        });

        this.saveDb();
        txtEl.value = "";
        
        // Refresh detail screen
        this.navigateTo("complaint-detail", compId);
    }

    filterComplaintsFeed() {
        const query = document.getElementById("feed-search").value.toLowerCase();
        const activeFilter = document.querySelector(".tag-btn.active").getAttribute("data-filter");
        
        let filtered = this.db.complaints;

        // Search Query Filter
        if (query) {
            filtered = filtered.filter(c => 
                c.title.toLowerCase().includes(query) || 
                c.desc.toLowerCase().includes(query) || 
                c.village.toLowerCase().includes(query)
            );
        }

        // Status Tag Filter
        if (activeFilter !== "all") {
            filtered = filtered.filter(c => c.status === activeFilter);
        }

        const targetList = document.getElementById("feed-list-target");
        targetList.innerHTML = this.renderFeedCards(filtered);
    }

    changeFeedFilter(filterVal, btn) {
        const tagBtns = document.querySelectorAll(".tag-btn");
        tagBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.filterComplaintsFeed();
    }

    showUcDetailModal(ucId) {
        const uc = this.db.unionCouncils.find(u => u.id === ucId);
        if (!uc) return;

        const complaintsCount = this.db.complaints.filter(c => c.uc === ucId).length;
        const resolvedCount = this.db.complaints.filter(c => c.uc === ucId && c.status === 'resolved').length;

        const placeholder = document.getElementById("uc-modal-placeholder");
        placeholder.innerHTML = `
            <div class="uc-detail-overlay" onclick="app.closeUcModal()">
                <div class="uc-modal-card" onclick="event.stopPropagation()">
                    <div class="uc-modal-header">
                        <span class="uc-modal-title">${uc.name}</span>
                        <button onclick="app.closeUcModal()" style="background:none; border:none; color:var(--text); font-size:1.2rem; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                    <div class="uc-stats-table">
                        <div class="table-row">
                            <span>ڪل آبادي:</span>
                            <strong>${uc.population}</strong>
                        </div>
                        <div class="table-row">
                            <span>پرائمري ۽ هاءِ اسڪول:</span>
                            <strong>${uc.schools}</strong>
                        </div>
                        <div class="table-row">
                            <span>اسپتالون / هيلٿ سينٽر:</span>
                            <strong>${uc.hospitals}</strong>
                        </div>
                        <div class="table-row">
                            <span>داخل ٿيل شڪايتون:</span>
                            <strong>${complaintsCount}</strong>
                        </div>
                        <div class="table-row">
                            <span>حل ٿيل شرح:</span>
                            <strong style="color:var(--success)">${uc.resolvedRate}% (${resolvedCount})</strong>
                        </div>
                    </div>
                    <button class="btn-primary" onclick="app.closeUcModal()">بند ڪريو</button>
                </div>
            </div>
        `;
    }

    closeUcModal() {
        const placeholder = document.getElementById("uc-modal-placeholder");
        placeholder.innerHTML = "";
    }

    submitSurveyVote(surveyId, optIndex) {
        const survey = this.db.surveys.find(s => s.id === surveyId);
        if (!survey) return;

        if (survey.votedUsers.includes(this.currentUser.id)) {
            this.showToast("توهان اڳ ۾ ئي ووٽ ڏئي چڪا آهيو!", "warning");
            return;
        }

        survey.options[optIndex].votes++;
        survey.votedUsers.push(this.currentUser.id);
        this.saveDb();
        
        this.showToast("توهان جو ووٽ ڪاميابيءَ سان رجسٽر ٿيو. مهرباني!", "success");
        this.navigateTo("voting");
    }

    createSocialPost() {
        const txtEl = document.getElementById("social-post-text");
        const txt = txtEl.value.trim();
        if (!txt) return;

        // Custom post submission simulator
        this.showToast("پوسٽ ڪاميابيءَ سان شيئر ڪئي وئي!", "success");
        txtEl.value = "";
        this.navigateTo("social");
    }

    likePost(btn) {
        const icon = btn.querySelector("i");
        const countSpan = btn.querySelector("span");
        let count = parseInt(countSpan.textContent);
        
        if (icon.classList.contains("fa-regular")) {
            icon.className = "fa-solid fa-heart";
            btn.classList.add("liked");
            countSpan.textContent = count + 1;
        } else {
            icon.className = "fa-regular fa-heart";
            btn.classList.remove("liked");
            countSpan.textContent = count - 1;
        }
    }

    // Notifications operations
    markAllNotificationsRead() {
        this.db.notifications.forEach(n => n.read = true);
        this.saveDb();
        this.showToast("سڀ نوٽيفڪيشنز پڙهيل نشان لڳايا ويا.", "info");
        this.navigateTo("notifications");
    }

    readNotification(id) {
        const notif = this.db.notifications.find(n => n.id === id);
        if (notif) {
            notif.read = true;
            this.saveDb();
        }
        this.navigateTo("notifications");
    }

    // Admin Operations
    approveComplaint(compId) {
        const comp = this.db.complaints.find(c => c.id === compId);
        if (comp) {
            comp.status = "approved";
            
            // Add notification to citizen
            this.db.notifications.unshift({
                id: `nt_${Date.now()}`,
                text: `توهان جي شڪايت '${comp.title}' منظور ڪئي وئي آهي. عملو جلد پهچندو.`,
                time: "هاڻي",
                read: false
            });

            this.db.activityLogs.unshift({
                user: this.currentUser.name,
                action: `شڪايت # ${comp.id} جي منظوري ڏني`,
                time: new Date().toLocaleDateString('sd-PK')
            });

            this.saveDb();
            this.showToast("شڪايت منظور ڪئي وئي ۽ لسٽ اپڊيٽ ڪئي وئي آهي.", "success");
            this.navigateTo("admin-moderation");
        }
    }

    rejectComplaint(compId) {
        const comp = this.db.complaints.find(c => c.id === compId);
        if (comp) {
            comp.status = "rejected";
            
            this.db.notifications.unshift({
                id: `nt_${Date.now()}`,
                text: `افسوس! توهان جي شڪايت '${comp.title}' رد ڪئي وئي آهي.`,
                time: "هاڻي",
                read: false
            });

            this.db.activityLogs.unshift({
                user: this.currentUser.name,
                action: `شڪايت # ${comp.id} کي رد ڪيو`,
                time: new Date().toLocaleDateString('sd-PK')
            });

            this.saveDb();
            this.showToast("شڪايت رد ڪئي وئي آهي.", "warning");
            this.navigateTo("admin-moderation");
        }
    }

    resolveComplaintDirectly(compId) {
        const comp = this.db.complaints.find(c => c.id === compId);
        if (comp) {
            comp.status = "resolved";
            
            this.db.notifications.unshift({
                id: `nt_${Date.now()}`,
                text: `مبارڪون! توهان جي شڪايت '${comp.title}' ڪاميابيءَ سان حل ڪئي وئي آهي.`,
                time: "هاڻي",
                read: false
            });

            this.db.activityLogs.unshift({
                user: this.currentUser.name,
                action: `شڪايت # ${comp.id} کي حل ٿيل مارڪ ڪيو`,
                time: new Date().toLocaleDateString('sd-PK')
            });

            this.saveDb();
            this.showToast("شڪايت ڪاميابيءَ سان حل ٿيل قرار ڏني وئي.", "success");
            this.navigateTo("admin-moderation");
        }
    }

    changeUserRole(userId, newRole) {
        const user = this.db.users.find(u => u.id === userId);
        if (user) {
            user.role = newRole;
            this.saveDb();
            this.showToast(`${user.name} جو رول تبديل ڪري ${this.getRoleLabel(newRole)} ڪيو ويو.`, "success");
        }
    }

    exportReport(type) {
        this.showToast(`رپورٽ تيار ٿي رهي آهي... (${type.toUpperCase()})`, "info");
        
        setTimeout(() => {
            // Mock download
            const link = document.createElement("a");
            link.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent("Mehar Town Report Output Data"));
            link.setAttribute("download", `mehar_town_report_${Date.now()}.${type}`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            this.showToast("رپورٽ ڪاميابيءَ سان ڊائون لوڊ ٿي وئي!", "success");
        }, 1500);
    }

    // System configurations
    toggleTheme(checkbox) {
        if (checkbox.checked) {
            document.body.classList.add("light-theme");
            this.showToast("لائٽ موڊ آن ڪيو ويو.", "info");
        } else {
            document.body.classList.remove("light-theme");
            this.showToast("ڊارڪ موڊ آن ڪيو ويو.", "info");
        }
    }

    saveFirebaseConfig() {
        this.showToast("Firebase ڪنفيگريشن محفوظ ڪئي وئي. سسٽم ڪنيڪٽيڊ!", "success");
        this.navigateTo("settings");
    }

    resetDatabase() {
        if (confirm("ڇا توهان واقعي سسٽم جو سمورو ريڪارڊ ريسٽ ڪرڻ چاهيو ٿا؟")) {
            localStorage.removeItem("mehar_town_db");
            this.initDatabase();
            this.showToast("ڊيٽابيس ريسٽ ٿي وئي!", "warning");
            this.navigateTo("splash");
        }
    }

    // Toast Notifications System (Inside Smartphone)
    showToast(message, type = "info") {
        // Clear existing toast if running
        const oldToast = document.querySelector(".app-toast");
        if (oldToast) {
            oldToast.remove();
            clearTimeout(this.toastTimeout);
        }

        const toast = document.createElement("div");
        toast.className = `app-toast app-toast-${type}`;
        
        let iconClass = "fa-circle-info";
        if (type === "success") iconClass = "fa-circle-check";
        if (type === "warning") iconClass = "fa-triangle-exclamation";
        if (type === "danger") iconClass = "fa-circle-xmark";

        toast.innerHTML = `
            <i class="fa-solid ${iconClass}"></i>
            <span>${message}</span>
        `;

        const phoneViewport = document.querySelector(".device-screen");
        phoneViewport.appendChild(toast);

        // Inject toast temporary CSS directly if not present
        if (!document.getElementById("toast-css")) {
            const style = document.createElement("style");
            style.id = "toast-css";
            style.textContent = `
                .app-toast {
                    position: absolute;
                    bottom: 80px;
                    left: 20px;
                    right: 20px;
                    background: rgba(15, 23, 42, 0.9);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255,255,255,0.08);
                    color: white;
                    padding: 12px 16px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 0.75rem;
                    font-weight: 500;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.5);
                    z-index: 9999;
                    animation: toastIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                    direction: rtl;
                }
                .app-toast-success { border-color: rgba(16,185,129,0.4); }
                .app-toast-success i { color: var(--success); }
                .app-toast-warning { border-color: rgba(245,158,11,0.4); }
                .app-toast-warning i { color: var(--warning); }
                .app-toast-danger { border-color: rgba(239,68,68,0.4); }
                .app-toast-danger i { color: var(--danger); }
                .app-toast-info i { color: var(--primary); }

                @keyframes toastIn {
                    from { opacity: 0; transform: translateY(20px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes toastOut {
                    from { opacity: 1; transform: translateY(0) scale(1); }
                    to { opacity: 0; transform: translateY(15px) scale(0.95); }
                }
            `;
            document.head.appendChild(style);
        }

        this.toastTimeout = setTimeout(() => {
            toast.style.animation = "toastOut 0.3s cubic-bezier(0.175, 0.885, 0.32, 1) forwards";
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }
}

// Global App Initialization
let app;
window.addEventListener("DOMContentLoaded", () => {
    app = new MeharTownApp();
    // Render splash screen initially
    app.navigateTo("splash");
});
