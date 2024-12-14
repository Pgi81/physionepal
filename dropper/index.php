<?php
// Prevent direct access
if (basename($_SERVER['PHP_SELF']) === basename(__FILE__)) {
    header("HTTP/1.0 403 Forbidden");
    exit('Direct access not allowed.');
}

// List of IDs and corresponding pages
$pages = [
    "assessmentMuscoOrth" => "musculoskeletal/assessment.php",
    "treatTabSpanMuscoOrth" => "musculoskeletal/treatment.php",
    "manualToolsMuscoOrth" => "musculoskeletal/manual-tools.php",
    "exerciseEquipMuscoOrtho" => "musculoskeletal/exercise-equipment.php",
    "tracSpiDecomMuscoOrtho" => "musculoskeletal/traction-decompression.php",
    "SpanMaterBraceMuscoOrtho" => "musculoskeletal/spanning-materials.php",
    "BalanceCoordNeuro" => "neurological/balance-coordination.php",
    "gaitMobilTrainNeuro" => "neurological/gait-training.php",
    "assesmentNeuro" => "neurological/assessment.php",
    "sensorIntegNeuro" => "neurological/sensory-integration.php",
    "musculeTrainNeuro" => "neurological/muscle-training.php",
    "monitorCardioRespi" => "cardio-respiratory/monitoring.php",
    "exerciseCardioRespi" => "cardio-respiratory/exercise.php",
    "respiEquipCardioRespi" => "cardio-respiratory/equipment.php",
    "assesmentCardioRespi" => "cardio-respiratory/assessment.php",
    "developMotorSkillPediatric" => "pediatric/motor-skills.php",
    "sensorPediatric" => "pediatric/sensory.php",
    "mobilEquipPediatric" => "pediatric/mobility-equipment.php",
    "assesmantPediatric" => "pediatric/assessment.php",
    "assesmentSports" => "sports/assessment.php",
    "trainRehabSports" => "sports/training-rehabilitation.php",
    "recovPrevSports" => "sports/recovery-prevention.php",
    "pelvicEquipWomenH" => "women-health/pelvic-equipment.php",
    "pregPostNatalWomenH" => "women-health/pregnancy-postnatal.php",
    "treatAssesmentWomenH" => "women-health/treatment-assessment.php",
    "respiEquipCriticIcu" => "critical-care/respi-equipment.php",
    "mobilEquipCriticIcu" => "critical-care/mobility-equipment.php",
    "monitorCriticIcu" => "critical-care/monitoring.php",
    "positioningCriticIcu" => "critical-care/positioning.php",
    "electroTheraSpecial" => "specialized/electro-therapy.php",
    "aquaticTheraSpecial" => "specialized/aquatic-therapy.php",
    "documentEduSpecial" => "specialized/documentation.php",
    "infectContSafeSpecial" => "specialized/infection-control.php",
    "workInjurPrevManageOccup" => "occupational/work-injury-prevention.php",
    "ergonoAssesAdvOccup" => "occupational/ergonomic-assessment.php",
    "RtwPrgOccup" => "occupational/return-to-work.php",
    "manualHandgTrainOccup" => "occupational/manual-handling.php",
    "WorkAssesOccup" => "occupational/work-assessment.php",
    "treatBalanDisoVesti" => "vestibular/balance-disorder-treatment.php",
    "vertiManageVesti" => "vestibular/vertigo-management.php",
    "innEarCondVesti" => "vestibular/inner-ear-conditions.php",
    "dizAssTreatVesti" => "vestibular/dizziness-treatment.php",
    "hotManual" => "manual-therapy/heat-therapy.php",
    "joinMobilManipManual" => "manual-therapy/joint-mobilization.php",
    "sofTissTechqManual" => "manual-therapy/soft-tissue-techniques.php",
    "myofasRelsManual" => "manual-therapy/myofascial-release.php",
    "spinManipManual" => "manual-therapy/spinal-manipulation.php",
    "canRelRehabOnco" => "oncology/cancer-rehabilitation.php",
    "posSurgiRecovOnco" => "oncology/post-surgery-recovery.php",
    "lypdemaManageOnco" => "oncology/lymphedema-management.php",
    "panManageOnco" => "oncology/pain-management.php",
    "exerPrgOnco" => "oncology/exercise-program.php",
    "treatBunBurnNWounCare" => "wound-care/burn-treatment.php",
    "wounHealBunNWouncare" => "wound-care/wound-healing.php",
    "skrManageBunNWounCare" => "wound-care/skin-management.php",
    "rngMotonMainBunNWounCare" => "wound-care/range-of-motion.php",
    "CompreTheraBunNWounCare" => "wound-care/compression-therapy.php",
    "agngConGeria" => "geriatrics/aging-conditions.php",
    "balanNFalPrevGeria" => "geriatrics/balance-fall-prevention.php",
    "osteoManagGeria" => "geriatrics/osteoporosis-management.php",
    "agRelMobilIssueGeria" => "geriatrics/age-related-mobility.php",
    "arthtisManageGeria" => "geriatrics/arthritis-management.php"
];

// Get the ID from the URL
$id = $_GET['id'] ?? null;

// Redirect based on ID
if ($id && array_key_exists($id, $pages)) {
    header("Location: " . $pages[$id]);
    exit;
} else {
    // Redirect to a default page if ID is invalid or not provided
    header("Location: error.php");
    exit;
}
?>
