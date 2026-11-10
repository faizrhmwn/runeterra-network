import { useState } from 'react'
import { useBuilds } from '../hooks/useBuilds'
import { usePWAInstall } from '../hooks/usePWAInstall'
import userService from '../services/userService'
import './ProfilePage.css'

const ROLES = ['Top Lane', 'Jungle', 'Mid Lane', 'Bot (ADC)', 'Support']
const RANKS = [
  'Iron IV', 'Bronze I', 'Silver II', 'Gold IV',
  'Platinum III', 'Emerald II', 'Diamond I',
  'Master', 'Grandmaster', 'Challenger'
]
const AVATARS = ['🧙', '⚔️', '🏹', '🛡️', '🗡️', '👑', '🐺', '🦊', '💀', '🐉']

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

/* Modal Edit Profile */
function EditProfileModal({ profile, onClose, onSave }) {
  const [form, setForm] = useState({ ...profile })

  const patch = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <span className="modal-tl" /><span className="modal-tr" />
        <span className="modal-bl" /><span className="modal-br" />

        <div className="modal-header">
          <h2>Edit Profil Mahasiswa</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Avatar selector */}
          <div className="form-group">
            <label>Pilih Avatar Karakter</label>
            <div className="avatar-grid">
              {AVATARS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  className={`avatar-opt${form.avatar === emoji ? ' selected' : ''}`}
                  onClick={() => patch('avatar', emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>Nama Lengkap</label>
              <input
                className="input"
                value={form.name}
                onChange={(e) => patch('name', e.target.value)}
                placeholder="Faiz Alif Rahmawan"
                required
              />
            </div>
            <div className="form-group">
              <label>NIM</label>
              <input
                className="input"
                value={form.nim}
                onChange={(e) => patch('nim', e.target.value)}
                placeholder="21120124130063"
                required
              />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>Kelompok</label>
              <input
                className="input"
                value={form.kelompok}
                onChange={(e) => patch('kelompok', e.target.value)}
                placeholder="Kelompok 13"
                required
              />
            </div>
            <div className="form-group">
              <label>Program Studi</label>
              <input
                className="input"
                value={form.prodi}
                onChange={(e) => patch('prodi', e.target.value)}
                placeholder="Teknik Komputer"
                required
              />
            </div>
          </div>

          <div className="gold-rule" />

          {/* LoL in-game details */}
          <div className="form-row-2">
            <div className="form-group">
              <label>Summoner Name</label>
              <input
                className="input"
                value={form.summoner}
                onChange={(e) => patch('summoner', e.target.value)}
                placeholder="Ziaf Fila"
              />
            </div>
            <div className="form-group">
              <label>Region</label>
              <input
                className="input"
                value={form.region}
                onChange={(e) => patch('region', e.target.value)}
                placeholder="ID (Indonesia)"
              />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>Main Role</label>
              <select
                className="input"
                value={form.mainRole}
                onChange={(e) => patch('mainRole', e.target.value)}
              >
                {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Rank Season</label>
              <select
                className="input"
                value={form.rank}
                onChange={(e) => patch('rank', e.target.value)}
              >
                {RANKS.map((rk) => <option key={rk} value={rk}>{rk}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Favorite Champion</label>
            <input
              className="input"
              value={form.favChamp}
              onChange={(e) => patch('favChamp', e.target.value)}
              placeholder="e.g. Ahri, Jinx, Yasuo"
            />
          </div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', paddingTop: 8 }}>
            <button type="button" className="btn btn-ghost" onClick={onClose}>Batal</button>
            <button type="submit" className="btn btn-primary">Simpan Profil</button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* Modal Petunjuk Install PWA */
function InstallGuideModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 500 }}>
        <span className="modal-tl" /><span className="modal-tr" />
        <span className="modal-bl" /><span className="modal-br" />

        <div className="modal-header">
          <h2>Cara Install Aplikasi PWA</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Aplikasi ini adalah <strong>Progressive Web App (PWA)</strong>. Anda bisa menginstallnya langsung ke desktop atau smartphone:
        </p>

        <ul className="pwa-steps">
          <li className="pwa-step-item">
            <span className="pwa-step-icon">💻</span>
            <div>
              <div className="pwa-step-title">Chrome / Edge / Opera GX (Desktop)</div>
              <div className="pwa-step-desc">
                Lihat di ujung kanan <strong>Address Bar</strong> browser Anda. Klik ikon <strong>Install (⊕ atau komputer kecil)</strong>, lalu klik <strong>Install</strong>.
              </div>
            </div>
          </li>
          <li className="pwa-step-item">
            <span className="pwa-step-icon">📱</span>
            <div>
              <div className="pwa-step-title">Google Chrome (Android)</div>
              <div className="pwa-step-desc">
                Tekan tombol menu <strong>titik tiga (⋮)</strong> di kanan atas browser, lalu pilih <strong>"Tambahkan ke Layar Utama"</strong> atau <strong>"Install Aplikasi"</strong>.
              </div>
            </div>
          </li>
          <li className="pwa-step-item">
            <span className="pwa-step-icon">🍎</span>
            <div>
              <div className="pwa-step-title">Safari (iPhone / iPad)</div>
              <div className="pwa-step-desc">
                Tekan tombol <strong>Share</strong> (kotak panah ke atas) di bawah, gulir ke bawah lalu pilih <strong>"Add to Home Screen"</strong>.
              </div>
            </div>
          </li>
        </ul>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
          <button className="btn btn-primary" onClick={onClose}>Mengerti</button>
        </div>
      </div>
    </div>
  )
}

export default function ProfilePage() {
  const { builds } = useBuilds()
  const { canInstall, isInstalled, promptInstall } = usePWAInstall()
  const [profile, setProfile] = useState(() => userService.getProfile())
  const [isEditing, setIsEditing] = useState(false)
  const [showGuide, setShowGuide] = useState(false)
  const [toast, setToast] = useState('')

  const flash = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const handleSaveProfile = (updated) => {
    userService.saveProfile(updated)
    setProfile(updated)
    setIsEditing(false)
    flash('Profil berhasil diperbarui dan tersimpan!')
  }

  const handleInstallClick = async () => {
    const res = await promptInstall()
    if (!res || !res.triggered) {
      setShowGuide(true)
    } else if (res.outcome === 'accepted') {
      flash('Aplikasi berhasil diinstall ke perangkat!')
    }
  }

  const totalItems = builds.reduce((n, b) => n + (b.items?.length || 0), 0)
  const uniqueRoles = [...new Set(builds.map((b) => b.role))].length

  return (
    <div className="profile-wrap">
      <div className="profile-topbar">
        <div className="page-header" style={{ marginBottom: 0 }}>
          <h1>Profile</h1>
        </div>
        <button className="btn btn-outline" onClick={() => setIsEditing(true)}>
          ✏️ Edit Profil
        </button>
      </div>

      {toast && <div className="alert alert-success">{toast}</div>}

      {/* PWA callout with functional Install button */}
      <div className="pwa-callout">
        <div className="pwa-callout-main">
          <div className="pwa-callout-icon"><DownloadIcon /></div>
          <div className="pwa-callout-text">
            <div className="pwa-callout-title">
              {isInstalled ? 'Aplikasi Terpasang (PWA Active)' : 'Install sebagai Aplikasi PWA'}
            </div>
            <div className="pwa-callout-desc">
              {isInstalled
                ? 'Aplikasi sudah berjalan dalam mode standalone. Semua fitur & data builds dapat diakses secara offline.'
                : 'Install LoL Tracker ke perangkat Anda untuk akses cepat satu klik dan dukungan penuh mode offline.'}
            </div>
          </div>
        </div>

        {isInstalled ? (
          <div className="pwa-install-btn installed">
            <CheckIcon /> Terinstall
          </div>
        ) : (
          <button type="button" className="pwa-install-btn" onClick={handleInstallClick}>
            <DownloadIcon /> Install App
          </button>
        )}
      </div>

      {/* Identity card */}
      <div className="id-card">
        <div className="id-card-bg" />

        {/* Avatar */}
        <div className="id-card-avatar-col">
          <div className="id-avatar">{profile.avatar || '🧙'}</div>
          <div className="id-avatar-role">{profile.mainRole}</div>
          <div className="id-avatar-rank">🥇</div>
          <div className="id-avatar-role">{profile.rank}</div>
        </div>

        {/* Info */}
        <div className="id-card-info">
          <div className="id-card-header-row">
            <div>
              <div className="id-name">{profile.name}</div>
              <div className="id-nim">NIM — {profile.nim}</div>
            </div>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setIsEditing(true)}
              title="Edit Data Profil"
            >
              ✏️ Edit
            </button>
          </div>

          <div className="id-badges">
            <span className="badge badge-gold">{profile.kelompok}</span>
            <span className="badge badge-blue">{profile.prodi}</span>
          </div>

          <hr className="id-rule" />

          <div className="id-stats-row">
            <div className="id-stat">
              <div className="id-stat-num">{builds.length}</div>
              <div className="id-stat-label">Builds</div>
            </div>
            <div className="id-stat">
              <div className="id-stat-num">{uniqueRoles || 0}</div>
              <div className="id-stat-label">Roles</div>
            </div>
            <div className="id-stat">
              <div className="id-stat-num">{totalItems}</div>
              <div className="id-stat-label">Items</div>
            </div>
          </div>
        </div>
      </div>

      {/* Academic info */}
      <div className="info-panel">
        <div className="info-panel-header">
          <span className="info-panel-title">Academic Information</span>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setIsEditing(true)}
          >
            Ubah
          </button>
        </div>
        <div className="info-rows">
          {[
            ['Nama Lengkap',  profile.name],
            ['NIM',           profile.nim],
            ['Kelompok',      profile.kelompok],
            ['Program Studi', profile.prodi],
          ].map(([label, value]) => (
            <div key={label} className="info-row">
              <span className="info-row-label">{label}</span>
              <span className="info-row-value">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Game info */}
      <div className="info-panel">
        <div className="info-panel-header">
          <span className="info-panel-title">Game Profile</span>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setIsEditing(true)}
          >
            Ubah
          </button>
        </div>
        <div className="info-rows">
          {[
            ['Summoner Name',    profile.summoner],
            ['Region',           profile.region],
            ['Main Role',        profile.mainRole],
            ['Current Rank',     profile.rank],
            ['Favorite Champion',profile.favChamp],
          ].map(([label, value]) => (
            <div key={label} className="info-row">
              <span className="info-row-label">{label}</span>
              <span className="info-row-value">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* App info */}
      <div className="info-panel">
        <div className="info-panel-header">
          <span className="info-panel-title">About This App</span>
        </div>
        <div className="info-rows">
          {[
            ['Type',       'Progressive Web App (PWA)'],
            ['Framework',  'React 18 + Vite 5'],
            ['Routing',    'React Router DOM v6'],
            ['API',        'Riot Data Dragon (Patch 16.22)'],
            ['Storage',    'localStorage — Offline-first CRUD'],
            ['Deployment', 'Vercel'],
            ['Course',     'Praktikum Pemrograman Perangkat Bergerak'],
          ].map(([label, value]) => (
            <div key={label} className="info-row">
              <span className="info-row-label">{label}</span>
              <span className="info-row-value" style={{ color: 'var(--text-secondary)' }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Edit */}
      {isEditing && (
        <EditProfileModal
          profile={profile}
          onClose={() => setIsEditing(false)}
          onSave={handleSaveProfile}
        />
      )}

      {/* Modal Guide PWA */}
      {showGuide && (
        <InstallGuideModal
          onClose={() => setShowGuide(false)}
        />
      )}
    </div>
  )
}
