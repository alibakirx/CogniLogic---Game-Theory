export interface TranslationDict {
  navbar: {
    playground: string;
    badges: string;
    reset_confirm: string;
  };
  landing: {
    badge: string;
    title_main: string;
    title_gradient: string;
    subtitle: string;
    cta: string;
    scenarios_title: string;
    scenarios_desc: string;
    sims_title: string;
    sims_desc: string;
    concepts_title: string;
    concepts_desc: string;
    decisions_title: string;
    decisions_desc: string;
  };
  dashboard: {
    welcome: string;
    level: string;
    progress: string;
    progress_sub: string;
    scenarios_section: string;
    completed: string;
    concepts_learned: string;
    difficulty: string;
    duration: string;
    achievements_section: string;
    unlocked: string;
    easy: string;
    medium: string;
    min_3: string;
    min_4: string;
    min_5: string;
    levels: string[];
    games: {
      pd_title: string;
      pd_desc: string;
      pd_c: string[];
      ch_title: string;
      ch_desc: string;
      ch_c: string[];
      ul_title: string;
      ul_desc: string;
      ul_c: string[];
    };
    badges: {
      first_decision_t: string;
      first_decision_d: string;
      rational_thinker_t: string;
      rational_thinker_d: string;
      risk_taker_t: string;
      risk_taker_d: string;
      cooperation_master_t: string;
      cooperation_master_d: string;
      fair_dealer_t: string;
      fair_dealer_d: string;
    };
  };
  profile: {
    title: string;
    archetype: string;
    coop_rate: string;
    risk_index: string;
    fair_index: string;
    strategy: string;
    archetypes: {
      undecided_t: string;
      undecided_d: string;
      altruist_t: string;
      altruist_d: string;
      opportunist_t: string;
      opportunist_d: string;
      tactician_t: string;
      tactician_d: string;
      guardian_t: string;
      guardian_d: string;
      balanced_t: string;
      balanced_d: string;
    };
  };
  pd: {
    back: string;
    diff: string;
    story_title: string;
    story_1: string;
    story_2: string;
    choice_prompt: string;
    silent_btn: string;
    silent_sub: string;
    betray_btn: string;
    betray_sub: string;
    verdict: string;
    play_again: string;
    explore_theory: string;
    matrix_title: string;
    matrix_desc: string;
    partner_side: string;
    your_strategy: string;
    coop_zone: string;
    nash_zone: string;
    what_happened: string;
    theory_xp: string;
    sentences: {
      year: string;
      years: string;
      free: string;
    };
    outcomes: {
      solidarity_t: string;
      solidarity_d: string;
      solidarity_v: string;
      temptation_t: string;
      temptation_d: string;
      temptation_v: string;
      betrayed_t: string;
      betrayed_d: string;
      betrayed_v: string;
      tragedy_t: string;
      tragedy_d: string;
      tragedy_v: string;
    };
    theory: {
      rational_t: string;
      rational_def: string;
      rational_ex: string;
      rational_app: string;
      dominant_t: string;
      dominant_def: string;
      dominant_ex: string;
      dominant_app: string;
      nash_t: string;
      nash_def: string;
      nash_ex: string;
      nash_app: string;
    };
  };
  chicken: {
    story_title: string;
    story_1: string;
    story_2: string;
    swerve_btn: string;
    swerve_sub: string;
    continue_btn: string;
    continue_sub: string;
    driving: string;
    hold_breath: string;
    payoff: string;
    strategy_analysis: string;
    rival: string;
    grid_title: string;
    grid_desc: string;
    grid_side: string;
    tie: string;
    win: string;
    lose: string;
    crash: string;
    understand_risk: string;
    outcomes: {
      swerve_t: string;
      swerve_d: string;
      swerve_pay_user: string;
      swerve_pay_partner: string;
      swerve_v: string;
      win_t: string;
      win_d: string;
      win_pay_user: string;
      win_pay_partner: string;
      win_v: string;
      lose_t: string;
      lose_d: string;
      lose_pay_user: string;
      lose_pay_partner: string;
      lose_v: string;
      crash_t: string;
      crash_d: string;
      crash_pay_user: string;
      crash_pay_partner: string;
      crash_v: string;
    };
    theory: {
      risk_t: string;
      risk_def: string;
      risk_ex: string;
      risk_app: string;
      credibility_t: string;
      credibility_def: string;
      credibility_ex: string;
      credibility_app: string;
      threats_t: string;
      threats_def: string;
      threats_ex: string;
      threats_app: string;
    };
  };
  ultimatum: {
    story_title: string;
    story_1: string;
    story_2: string;
    keep: string;
    gets: string;
    submit: string;
    evaluating: string;
    evaluating_sub: string;
    accepted_t: string;
    accepted_sub: string;
    rejected_t: string;
    rejected_sub: string;
    earnings_user: string;
    earnings_partner: string;
    why_title: string;
    why_accept: string;
    why_reject: string;
    propose_again: string;
    graph_title: string;
    graph_desc: string;
    offer_under_20: string;
    offer_20_29: string;
    offer_30_39: string;
    offer_40_49: string;
    offer_50: string;
    acceptance: string;
    math_vs_mind: string;
    theory: {
      fairness_t: string;
      fairness_def: string;
      fairness_ex: string;
      fairness_app: string;
      irrationality_t: string;
      irrationality_def: string;
      irrationality_ex: string;
      irrationality_app: string;
      behavioral_t: string;
      behavioral_def: string;
      behavioral_ex: string;
      behavioral_app: string;
    };
  };
  coach: {
    title: string;
    sub: string;
    welcome_msg: string;
    typing: string;
    input_placeholder: string;
    suggest_suboptimal: string;
    suggest_rational: string;
    no_games: string;
    pd_silent_suboptimal: string;
    pd_silent_general: string;
    pd_betray_suboptimal: string;
    pd_betray_general: string;
    ch_swerve_suboptimal: string;
    ch_swerve_general: string;
    ch_continue_suboptimal: string;
    ch_continue_general: string;
    ul_suboptimal_low: string;
    ul_suboptimal_high: string;
    ul_suboptimal_optimal: string;
    ul_general: string;
    default_reply: string;
  };
}

export const translations: Record<'en' | 'tr', TranslationDict> = {
  en: {
    navbar: {
      playground: 'Playground',
      badges: 'BADGES',
      reset_confirm: 'Are you sure you want to reset all XP and decision data?',
    },
    landing: {
      badge: 'The Gamified Economics Classroom',
      title_main: 'Learn Game Theory',
      title_gradient: 'by Playing',
      subtitle: 'Discover how strategic decisions shape outcomes through interactive experiments. Make your move, face the consequences, and understand the theory.',
      cta: 'Start Playing',
      scenarios_title: 'Interactive Scenarios',
      scenarios_desc: 'Step into the shoes of suspects, drivers, or dealmakers in high-stakes stories.',
      sims_title: 'Real-Time Simulations',
      sims_desc: 'Watch animated results unfold instantly based on your choices and AI replies.',
      concepts_title: 'Learn Core Concepts',
      concepts_desc: 'Demystify dominant strategies, Nash equilibrium, and human irrationality.',
      decisions_title: 'Track Your Decisions',
      decisions_desc: 'Map your cooperativeness, risk profile, and fairness with custom radar charts.',
    },
    dashboard: {
      welcome: 'Welcome, Player',
      level: 'Level',
      progress: 'Level Progress',
      progress_sub: 'Complete games (+50 XP) and read theory (+20 XP) to rank up',
      scenarios_section: 'Interactive Scenarios',
      completed: 'Completed',
      concepts_learned: 'Concepts Learned',
      difficulty: 'Difficulty',
      duration: 'Duration',
      achievements_section: 'Unlocked Achievements',
      unlocked: 'Unlocked',
      easy: 'Easy',
      medium: 'Medium',
      min_3: '3 mins',
      min_4: '4 mins',
      min_5: '5 mins',
      levels: [
        'Novice Decision Maker',
        'Calculated Planner',
        'Nash Graduate',
        'Strategic Architect',
        'Grand Game Theorist',
      ],
      games: {
        pd_title: "Prisoner's Dilemma",
        pd_desc: 'Two suspects are arrested. Will you cooperate with your accomplice or betray them for a shorter sentence?',
        pd_c: ['Nash Equilibrium', 'Dominant Strategy', 'Rational Choice'],
        ch_title: 'Chicken Game',
        ch_desc: 'Two drivers speed toward each other on a collision course. Who will swerve first, and who will remain brave?',
        ch_c: ['Risk Assessment', 'Threat Credibility', 'Strategic Commitments'],
        ul_title: 'Ultimatum Game',
        ul_desc: 'You have $100 to split with a responder. Will they accept your offer, or reject it entirely to punish your greed?',
        ul_c: ['Fairness Norms', 'Human Irrationality', 'Behavioral Economics'],
      },
      badges: {
        first_decision_t: 'First Decision',
        first_decision_d: 'Made your first choice in any scenario.',
        rational_thinker_t: 'Rational Thinker',
        rational_thinker_d: "Explored the Nash Equilibrium in Prisoner's Dilemma.",
        risk_taker_t: 'Risk Taker',
        risk_taker_d: 'Dared to face danger in the Chicken Game.',
        cooperation_master_t: 'Cooperation Master',
        cooperation_master_d: 'Prioritized mutual benefit in scenarios.',
        fair_dealer_t: 'Fair Dealer',
        fair_dealer_d: 'Offered an even split in the Ultimatum Game.',
      },
    },
    profile: {
      title: 'Your Decision Profile',
      archetype: 'Archetype',
      coop_rate: 'Cooperation Rate',
      risk_index: 'Risk Index',
      fair_index: 'Fairness Index',
      strategy: 'STRATEGY',
      archetypes: {
        undecided_t: 'Undecided Voyager',
        undecided_d: 'Play at least one scenario to map your psychological decision profile.',
        altruist_t: 'Altruistic Diplomat 🤝',
        altruist_d: 'You place high value on cooperation and fairness. You prefer outcomes that maximize social good, even if it leaves you slightly vulnerable to exploitation.',
        opportunist_t: 'Daring Opportunist ⚡',
        opportunist_d: 'You are highly comfortable with risk and prioritize personal gain. You seek to exploit cooperative tendencies in opponents but risk catastrophic failure when they resist.',
        tactician_t: 'Rational Tactician 🧠',
        tactician_d: 'You make mathematically sound, self-interested decisions. You seek out Nash equilibria and dominant strategies to ensure you are never the "sucker".',
        guardian_t: 'Equity Guardian ⚖️',
        guardian_d: 'You value fair distribution and low-risk interactions. You are willing to sacrifice potential windfalls to ensure outcome equality and safety.',
        balanced_t: 'Pragmatic Balanced Player 🧩',
        balanced_d: 'You adapt your strategy based on the scenario. You cooperate when safety is needed, but are willing to take calculated risks when the stakes are high.',
      },
    },
    pd: {
      back: 'Back to Dashboard',
      diff: 'Difficulty: Easy',
      story_title: 'The Interrogation',
      story_1: 'You and your accomplice have been arrested for a major robbery. The detectives separate you into different interrogation rooms. You have no way to communicate.',
      story_2: 'The prosecutor makes a deal: If you betray your partner, they will let you off free while your partner gets 10 years. If you both stay silent, they will charge you with a minor offense (1 year each). But if you both betray, you both get 5 years.',
      choice_prompt: 'Choose your path:',
      silent_btn: 'Stay Silent',
      silent_sub: 'Cooperate with partner',
      betray_btn: 'Betray Partner',
      betray_sub: 'Maximize self-interest',
      verdict: 'Verdict',
      play_again: 'Play Again',
      explore_theory: 'Explore the Theory',
      matrix_title: 'Payoff Matrix',
      matrix_desc: 'Hover choices or check the outcome in the matrix below. Format: (Your Sentence, Partner\'s Sentence).',
      partner_side: 'Partner (Accomplice)',
      your_strategy: 'Your Strategy',
      coop_zone: 'Cooperative Zone',
      nash_zone: 'Nash Equilibrium Zone',
      what_happened: 'What Just Happened?',
      theory_xp: 'Theory Section (+20 XP per read)',
      sentences: {
        year: '1 year',
        years: 'years',
        free: '0 years (Free)',
      },
      outcomes: {
        solidarity_t: 'Mutual Solidarity 🤝',
        solidarity_d: 'Both of you stayed silent. The police only have enough evidence to convict you on minor charges.',
        solidarity_v: 'You worked together! But is it stable?',
        temptation_t: 'Temptation Realized 😈',
        temptation_d: 'You betrayed your partner while they kept quiet. You walk free immediately, while your partner gets the maximum sentence.',
        temptation_v: 'Great personal outcome, but you left your partner behind.',
        betrayed_t: 'Betrayed & Captured 💔',
        betrayed_d: 'You stayed loyal, but your partner sold you out. They walk free while you take the full heat.',
        betrayed_v: 'Loyalty backfired. This is why cooperation is hard to sustain.',
        tragedy_t: 'Tragedy of Defection 💥',
        tragedy_d: 'Both of you tried to betray each other. The police convict both of you with moderate sentences.',
        tragedy_v: 'Both acted in self-interest, leading to a worse outcome than mutual silence.',
      },
      theory: {
        rational_t: 'Rational Choice Theory',
        rational_def: 'Rational Choice Theory assumes individuals use rational calculations to make choices that align with their personal objectives, maximizing their self-interest and utility.',
        rational_ex: 'In this game, no matter what your partner does, betraying them gets you a shorter sentence. If they stay silent, you get 0 years instead of 1 year. If they betray, you get 5 years instead of 10 years. Therefore, betraying is always the "rational" selfish move.',
        rational_app: 'Businesses deciding whether to advertise or drop prices. If one drops price, they take the market; if both do, they both lose profits.',
        dominant_t: 'Dominant Strategy',
        dominant_def: 'A dominant strategy is one that yields a better outcome for a player regardless of what the other players choose to do.',
        dominant_ex: 'Betraying (defecting) is the dominant strategy for both players in the Prisoner\'s Dilemma. Regardless of the partner\'s action, defecting always yields a better payoff than cooperating.',
        dominant_app: 'Global disarmament treaties. Countries are incentivized to maintain nuclear weapons (defect) rather than disarm (cooperate) to avoid being vulnerable.',
        nash_t: 'Nash Equilibrium',
        nash_def: 'A Nash Equilibrium is a state in a game where no player can improve their payoff by unilaterally changing their strategy, assuming the other players keep theirs unchanged.',
        nash_ex: 'When both players betray (5 years / 5 years), neither can benefit by changing their mind. If you switched to Silent, you would get 10 years instead of 5. If your partner switched, they would get 10. Thus, (Betray, Betray) is the stable Nash Equilibrium, even though (Silent, Silent) is better for both.',
        nash_app: 'Price wars between ride-sharing companies, where both cut fares to a low-profit point and cannot raise them without losing all customers.',
      },
    },
    chicken: {
      story_title: 'The Highway Duel',
      story_1: 'You and a rival are driving high-speed sports cars directly toward each other on a narrow, one-lane bridge. The driver who swerves is branded a coward ("chicken") and loses face. The driver who keeps going straight wins glory.',
      story_2: 'If neither of you swerves, you collide head-on. The outcome is fatal.',
      swerve_btn: 'Swerve',
      swerve_sub: 'Avoid crash, risk pride',
      continue_btn: 'Continue Straight',
      continue_sub: 'Dare the opponent',
      driving: 'DRIVING AT SPEED... BOTH APPORACHING THE BRIDGE',
      hold_breath: 'HOLD YOUR BREATH!',
      payoff: 'Your Payoff',
      strategy_analysis: 'Strategy Analysis',
      rival: 'Rival',
      grid_title: 'Payoff Grid',
      grid_desc: 'The Chicken Game payoff matrix has no single dominant strategy. It leads to anti-coordination:',
      grid_side: 'Opponent Choice',
      tie: 'Tie',
      win: 'Win',
      lose: 'Lose',
      crash: 'Crash',
      understand_risk: 'Understand the Risk',
      outcomes: {
        swerve_t: 'Mutual Swerve (Tie) 🐔',
        swerve_d: 'Both of you swerved at the last second. Neither player earns the reputation of being brave, but both survive to drive another day.',
        swerve_pay_user: 'Slight embarrassment (-1 reputation)',
        swerve_pay_partner: 'Slight embarrassment (-1 reputation)',
        swerve_v: 'Safe but mediocre. Neither of you backed down early enough to claim victory.',
        win_t: 'Total Victory! 🏆',
        win_d: 'You drove straight while the other driver swerved in fear! You are hailed as brave and daring, while they are branded a "chicken".',
        win_pay_user: 'Glory & Prestige (+10 reputation)',
        win_pay_partner: 'Disgrace & Mockery (-10 reputation)',
        win_v: 'Your threat was credible (or you were crazy enough). You won this round!',
        lose_t: 'Labeled a Chicken 💔',
        lose_d: 'You swerved to save your life, while the other driver sped straight forward. They win the respect, you get the mockery.',
        lose_pay_user: 'Disgrace & Mockery (-10 reputation)',
        lose_pay_partner: 'Glory & Prestige (+10 reputation)',
        lose_v: 'You chose survival over pride. A rational decision, but socially painful.',
        crash_t: 'Fatal Collision! 💥',
        crash_d: 'Neither of you backed down. Both cars crash head-on at high speed. A catastrophic outcome.',
        crash_pay_user: 'Severe Injury / Loss of Life (-100 value)',
        crash_pay_partner: 'Severe Injury / Loss of Life (-100 value)',
        crash_v: 'The ultimate tragedy of the Chicken Game. Pride led to mutual destruction.',
      },
      theory: {
        risk_t: 'Risk & Strategy',
        risk_def: 'Risk describes the uncertainty of outcomes where some alternatives have disastrous consequences. In Chicken, continuing yields the highest payoff if the opponent swerves, but the worst possible outcome if they do not.',
        risk_ex: 'If you choose "Continue", you gamble that the opponent values their life enough to swerve. If they are equally reckless, the risk realizes into a catastrophe.',
        risk_app: 'Financial markets. High-yield leverage provides huge profits, but can trigger total bankruptcy if the market shifts slightly.',
        credibility_t: 'Credibility',
        credibility_def: 'Credibility is the believability of a threat or promise. If your opponent believes you will absolutely not swerve, they are forced to swerve to survive.',
        credibility_ex: 'If you have a reputation for being completely reckless or irrational, your threat to "Continue" becomes highly credible. The other player, knowing this, is forced to swerve.',
        credibility_app: 'Geopolitical negotiations. Countries conducting military drills to signal they are ready to go to war, forcing adversaries to back down.',
        threats_t: 'Strategic Threats & Binding Commitments',
        threats_def: 'A strategic threat is a action that limits your own options to force the other player into a specific choice. By visibly disabling your ability to back down, you command the outcome.',
        threats_ex: 'A classic strategy in the Chicken Game is to visibly unscrew your steering wheel and throw it out the window. Now, the opponent knows you CANNOT swerve, leaving them with only one way to avoid death: they must swerve.',
        threats_app: 'Corporate contracts with heavy termination penalties, making it clear to competitors that you cannot withdraw from a market.',
      },
    },
    ultimatum: {
      story_title: 'The Splitting Deal',
      story_1: 'You are given $100. You must propose how to split this money with a simulated responder (AI).',
      story_2: 'If the responder accepts your offer, the money is split exactly as proposed. If the responder rejects your offer, both of you walk away with nothing ($0).',
      keep: 'You Keep',
      gets: 'Opponent Gets',
      submit: 'Submit Proposal',
      evaluating: 'Evaluating Offer...',
      evaluating_sub: 'The responder is analyzing the fairness of your offer.',
      accepted_t: 'Offer Accepted!',
      accepted_sub: 'The responder deemed your proposal acceptable.',
      rejected_t: 'Offer Rejected!',
      rejected_sub: 'The responder rejected the split as unfair.',
      earnings_user: 'Your Final Earnings',
      earnings_partner: 'AI Final Earnings',
      why_title: 'Why did the AI decide this?',
      why_accept: 'The responder felt respected. The monetary payout exceeded their pride threshold, making it a win-win exchange.',
      why_reject: 'The offer is below the responder\'s dignity threshold. They chose to burn the $100 entirely to punish your low offer, leaving both of you with $0.',
      propose_again: 'Propose Another Split',
      graph_title: 'Split Probability Graph',
      graph_desc: 'Historical studies show responder acceptance rates are highly non-linear relative to offers.',
      offer_under_20: 'Offer under $20',
      offer_20_29: 'Offer $20 - $29',
      offer_30_39: 'Offer $30 - $39',
      offer_40_49: 'Offer $40 - $49',
      offer_50: 'Offer $50+',
      acceptance: 'Acceptance',
      math_vs_mind: 'The Math vs. The Mind',
      theory: {
        fairness_t: 'Fairness & Social Preferences',
        fairness_def: 'Fairness in economics represents social preferences where individuals value the well-being of others and penalize inequity, even if it comes at a personal financial cost.',
        fairness_ex: 'In the Ultimatum Game, standard economic theory predicts that a rational responder should accept any offer greater than $0 (since $1 is better than $0). However, in real life, responders routinely reject offers under $30 because they perceive them as unfair and prefer to punish greed.',
        fairness_app: 'Salary negotiations. Employees will often reject salary offers they perceive as below market value or unfair relative to peers, even if it leads to unemployment.',
        irrationality_t: 'Human Irrationality',
        irrationality_def: 'Human irrationality refers to decisions that deviate from the prediction of classical economic models (homo economicus), which assume actors always maximize financial payoffs.',
        irrationality_ex: 'Rejecting a $10 offer out of $100 means you end up with $0 instead of $10. Purely financially, this is irrational. But psychologically, the utility gained by punishing an unfair proposer outweighs the $10 loss.',
        irrationality_app: 'Boycotting companies that engage in unethical practices, even if their products are cheaper and more convenient.',
        behavioral_t: 'Behavioral Economics',
        behavioral_def: 'Behavioral economics combines psychology and economics to investigate why people make decisions that deviate from classical economic logic.',
        behavioral_ex: 'This game shows that human economic transactions are not conducted in a vacuum. Emotional states, social norms, and expectations of fairness guide choices alongside financial rewards.',
        behavioral_app: 'Designing retirement saving programs that auto-enroll employees (nudging) because humans are naturally prone to inertia and procrastination.',
      },
    },
    coach: {
      title: 'AI Strategy Coach',
      sub: 'Pedagogical feedback on your moves',
      welcome_msg: 'Hello! I am your AI Strategy Coach. Play any scenario, then ask me: "Why was my decision suboptimal?" or ask for tips on how to improve your strategic play!',
      typing: 'Evaluating query...',
      input_placeholder: 'Ask the coach...',
      suggest_suboptimal: 'Why was my decision suboptimal?',
      suggest_rational: 'What was the rational move?',
      no_games: "It looks like you haven't played any scenarios yet! Go ahead and try the Prisoner's Dilemma, Chicken Game, or Ultimatum Game on the dashboard. Once you make a choice, I can dissect your strategy.",
      pd_silent_suboptimal: "You chose to stay Silent. In a one-shot Prisoner's Dilemma, this is strategically suboptimal because staying Silent is a strictly dominated strategy. No matter what your partner does, you would get a better payoff by Betraying them. By staying Silent, you risked (and likely hit) the 'Sucker's Payoff' (10 years) if they defected. However, in repeated interactions, cooperating first is a key component of the famous 'Tit-for-Tat' strategy, which builds long-term trust.",
      pd_silent_general: 'Staying Silent represents cooperation. It is a noble strategy, but in game theory, it leaves you vulnerable. In a single-round game, betrayal is the rational equilibrium.',
      pd_betray_suboptimal: "You chose to Betray. From a game theory standpoint, this was the 'optimal' rational choice, as Betray is your Dominant Strategy (it gives you a better payoff regardless of the accomplice's choice). However, when both players behave this way, you end up at the Nash Equilibrium (5 years each), which is collectively worse than if you had both stayed silent (1 year each). This paradox shows that individual rationality can lead to collective ruin.",
      pd_betray_general: 'Betrayal is the Nash Equilibrium action. You protected yourself from the maximum sentence, but in doing so, you eliminated the possibility of mutual cooperation.',
      ch_swerve_suboptimal: "You swerved, which led to you being labeled a 'chicken'. Is this suboptimal? From a survival standpoint, absolutely not! A crash yields a -100 payoff, while swerving yields -10. It is a highly rational, risk-averse choice. However, to win the game, you must convince the other player you will NEVER swerve. This requires strategic commitments—like throwing away your steering wheel—forcing them to back down.",
      ch_swerve_general: 'You chose safety over glory. Swerving is the only sensible option unless you have successfully established a credible strategic threat that forces the other driver to swerve first.',
      ch_continue_suboptimal: "You drove straight. This is a highly aggressive, risk-seeking move. It is optimal only if you successfully convinced the other driver you wouldn't back down, forcing them to swerve. If they were equally stubborn, you would have suffered a fatal collision. In game theory, this strategy relies on 'Strategic Irrationality'—acting crazy so the other player has to play safe.",
      ch_continue_general: 'Driving straight is a high-stakes gamble. If the opponent behaves rationally and swerves, you win. If they are also stubborn, you both perish.',
      ul_suboptimal_low: 'You offered a low split. This was highly suboptimal because humans have social preferences for fairness. In real experiments, offers below $30 are rejected over 70% of the time. Responders are willing to lose the split just to punish your greed. To maximize your earnings, you should offer $35-$40. That is the empirical sweet spot to ensure acceptance while keeping the majority share.',
      ul_suboptimal_high: 'You offered a generous split. While this guarantees acceptance, it is economically suboptimal because you left money on the table. You gave away 50% or more when you could have offered $35 or $40 and still had a 90%+ chance of acceptance, keeping $60+ for yourself. Generosity is admirable, but from a utility-maximization view, it was overly generous.',
      ul_suboptimal_optimal: 'Superb strategy! Offering between $35 and $45 is the optimal equilibrium when playing against humans. It satisfies their minimum fairness threshold to avoid rejection, while leaving you with a substantial majority share of $55-$65. Well played!',
      ul_general: 'Your split offer was evaluated. In behavioral economics, this game shows that human utility calculations include emotional factors like dignity and fairness alongside pure money.',
      default_reply: 'Game theory is the study of mathematical models of strategic interaction. Try asking: "Why did my last decision yield this result?" or "What is a dominant strategy?"',
    },
  },
  tr: {
    navbar: {
      playground: 'Oyun Alanı',
      badges: 'ROZETLER',
      reset_confirm: 'Tüm XP ve karar verilerini sıfırlamak istediğinizden emin misiniz?',
    },
    landing: {
      badge: 'Oyunlaştırılmış Ekonomi Sınıfı',
      title_main: "Oyun Teorisi'ni",
      title_gradient: 'Oynayarak Öğrenin',
      subtitle: 'Stratejik kararların sonuçları nasıl şekillendirdiğini etkileşimli deneylerle keşfedin. Hamlenizi yapın, sonuçlarla yüzleşin ve teoriyi kavrayın.',
      cta: 'Oynamaya Başla',
      scenarios_title: 'Etkileşimli Senaryolar',
      scenarios_desc: 'Yüksek riskli hikayelerde şüphelilerin, sürücülerin veya pazarlıkçıların yerine geçin.',
      sims_title: 'Gerçek Zamanlı Simülasyonlar',
      sims_desc: 'Seçimlerinize ve yapay zeka yanıtlarına göre anında şekillenen animasyonlu sonuçları izleyin.',
      concepts_title: 'Temel Kavramları Öğrenin',
      concepts_desc: 'Baskın stratejileri, Nash dengesini ve insani mantıksızlığı keşfedin.',
      decisions_title: 'Kararlarınızı Takip Edin',
      decisions_desc: 'Özel radar grafikleriyle işbirlikçiliğinizi, risk profilinizi ve adalet anlayışınızı haritalandırın.',
    },
    dashboard: {
      welcome: 'Hoş Geldin, Oyuncu',
      level: 'Seviye',
      progress: 'Seviye İlerlemesi',
      progress_sub: 'Seviye atlamak için oyunları tamamlayın (+50 XP) ve teorileri okuyun (+20 XP)',
      scenarios_section: 'Etkileşimli Senaryolar',
      completed: 'Tamamlandı',
      concepts_learned: 'Öğrenilen Kavramlar',
      difficulty: 'Zorluk',
      duration: 'Süre',
      achievements_section: 'Açılan Başarılar',
      unlocked: 'Açıldı',
      easy: 'Kolay',
      medium: 'Orta',
      min_3: '3 dk',
      min_4: '4 dk',
      min_5: '5 dk',
      levels: [
        'Karar Verici Çırak',
        'Hesaplı Planlayıcı',
        'Nash Mezunu',
        'Strateji Mimarı',
        'Büyük Oyun Teorisyeni',
      ],
      games: {
        pd_title: "Tutsak İkilemi (Prisoner's Dilemma)",
        pd_desc: 'İki şüpheli tutuklandı. Suç ortağınızla iş birliği mi yapacaksınız yoksa daha az ceza için ona ihanet mi edeceksiniz?',
        pd_c: ['Nash Dengesi', 'Baskın Strateji', 'Rasyonel Seçim'],
        ch_title: 'Korkak Oyunu (Chicken Game)',
        ch_desc: 'İki sürücü dar bir köprüde çarpışma rotasında hızla ilerliyor. İlk kim direksiyonu kıracak, kim cesur kalacak?',
        ch_c: ['Risk Değerlendirmesi', 'Tehdit Güvenilirliği', 'Stratejik Taahhütler'],
        ul_title: 'Ultimatom Oyunu',
        ul_desc: 'Bölüşmek için 100 dolarınız var. Karşı taraf teklifinizi kabul mü edecek, yoksa açgözlülüğünüzü cezalandırmak için tamamen reddedecek mi?',
        ul_c: ['Adalet Normları', 'İnsani Mantıksızlık', 'Davranışsal Ekonomi'],
      },
      badges: {
        first_decision_t: 'İlk Karar',
        first_decision_d: 'Herhangi bir senaryoda ilk seçiminizi yaptınız.',
        rational_thinker_t: 'Rasyonel Düşünür',
        rational_thinker_d: "Tutsak İkilemi'nde Nash Dengesi'ni keşfettiniz.",
        risk_taker_t: 'Risk Alan',
        risk_taker_d: 'Korkak Oyunu\'nda tehlikeye meydan okudunuz.',
        cooperation_master_t: 'İş Birliği Ustası',
        cooperation_master_d: 'Senaryolarda karşılıklı faydayı önceliklendirdiniz.',
        fair_dealer_t: 'Adil Dağıtıcı',
        fair_dealer_d: 'Ultimatum Oyunu\'nda tam ortadan bölüşme teklif ettiniz.',
      },
    },
    profile: {
      title: 'Karar Profiliniz',
      archetype: 'Arketip',
      coop_rate: 'İş Birliği Oranı',
      risk_index: 'Risk Endeksi',
      fair_index: 'Adalet Endeksi',
      strategy: 'STRATEJİ',
      archetypes: {
        undecided_t: 'Kararsız Gezgin',
        undecided_d: 'Psikolojik karar profilinizi haritalandırmak için en az bir senaryo oynayın.',
        altruist_t: 'Özverili Diplomat 🤝',
        altruist_d: 'İş birliğine ve adalete yüksek değer veriyorsunuz. Sizi sömürüye açık bıraksa bile toplumsal faydayı maksimize eden sonuçları tercih ediyorsunuz.',
        opportunist_t: 'Cesur Fırsatçı ⚡',
        opportunist_d: 'Riski seviyor ve kişisel kazancı önceliklendiriyorsunuz. Rakiplerdeki iş birliği eğilimlerini sömürmeyi hedefliyorsunuz ancak direnç gösterdiklerinde yıkıcı sonuçlarla karşılaşıyorsunuz.',
        tactician_t: 'Rasyonel Taktisyen 🧠',
        tactician_d: 'Matematiksel olarak sağlam ve kendi çıkarınızı gözeten kararlar veriyorsunuz. Asla "kazıklanan" olmamak için Nash dengelerini ve baskın stratejileri arıyorsunuz.',
        guardian_t: 'Adalet Koruyucusu ⚖️',
        guardian_d: 'Adil dağıtıma ve düşük riskli etkileşimlere değer veriyorsunuz. Eşitliği ve güvenliği sağlamak için büyük kazançlardan vazgeçmeye hazırsınız.',
        balanced_t: 'Pragmatik Dengeli Oyuncu 🧩',
        balanced_d: 'Stratejinizi senaryoya göre uyarlıyorsunuz. Güvenlik gerektiğinde iş birliği yapıyor, ancak riskler yüksek olduğunda hesaplanmış riskler alabiliyorsunuz.',
      },
    },
    pd: {
      back: 'Panele Geri Dön',
      diff: 'Zorluk: Kolay',
      story_title: 'Sorgu Odası',
      story_1: 'Siz ve suç ortağınız büyük bir soygundan ötürü tutuklandınız. Dedektifler sizi ayrı sorgu odalarına yerleştirdi. İletişim kurma imkanınız yok.',
      story_2: 'Savcı bir anlaşma öneriyor: Ortak ifşa edip ihanet ederseniz, serbest kalırsınız, ortağınız ise 10 yıl ceza alır. İkiniz de susarsanız, hafif bir suçtan 1\'er yıl yatarsınız. Ancak ikiniz de ihanet ederseniz, 5\'er yıl alırsınız.',
      choice_prompt: 'Yolunuzu seçin:',
      silent_btn: 'Sessiz Kal',
      silent_sub: 'Ortakla iş birliği yap',
      betray_btn: 'Ortağa İhanet Et',
      betray_sub: 'Kendi çıkarını koru',
      verdict: 'Karar',
      play_again: 'Yeniden Oyna',
      explore_theory: 'Teoriyi İncele',
      matrix_title: 'Kazanç Matrisi (Payoff Matrix)',
      matrix_desc: 'Seçeneklerin üzerine gelin veya matristeki sonucu inceleyin. Format: (Sizin Cezanız, Ortağın Cezası).',
      partner_side: 'Ortak (Suç Ortağı)',
      your_strategy: 'Sizin Stratejiniz',
      coop_zone: 'İş Birliği Bölgesi',
      nash_zone: 'Nash Dengesi Bölgesi',
      what_happened: 'Az Önce Ne Oldu?',
      theory_xp: 'Teori Bölümü (Okuma başına +20 XP)',
      sentences: {
        year: '1 yıl',
        years: 'yıl',
        free: '0 yıl (Serbest)',
      },
      outcomes: {
        solidarity_t: 'Karşılıklı Dayanışma 🤝',
        solidarity_d: 'İkiniz de sessiz kaldınız. Polis sadece hafif suçlardan ceza verecek kadar kanıta sahip.',
        solidarity_v: 'Birlikte çalıştınız! Ancak bu durum dengeli mi?',
        temptation_t: 'Cazibeye Yenik Düşme 😈',
        temptation_d: 'Ortağınız sessiz kalırken siz ona ihanet ettiniz. Siz hemen serbest kalırken, ortağınız maksimum cezayı aldı.',
        temptation_v: 'Kişisel olarak harika sonuç, ancak ortağınızı geride bıraktınız.',
        betrayed_t: 'İhanete Uğrama & Yakalanma 💔',
        betrayed_d: 'Siz sadık kaldınız ancak ortağınız sizi sattı. O serbest kalırken, tüm cezayı siz çekiyorsunuz.',
        betrayed_v: 'Sadakat ters tepti. İş birliğini sürdürmenin neden zor olduğunun kanıtı.',
        tragedy_t: 'İhanetin Trajedisi 💥',
        tragedy_d: 'İkiniz de birbirinizi satmaya çalıştınız. Polis ikinizi de orta seviyede hapis cezasına çarptırdı.',
        tragedy_v: 'İki taraf da kendi çıkarını gözetti ve karşılıklı sessizlikten daha kötü bir sonuç elde etti.',
      },
      theory: {
        rational_t: 'Rasyonel Seçim Teorisi',
        rational_def: 'Rasyonel Seçim Teorisi, bireylerin kendi çıkarlarını ve faydalarını maksimize etmek için rasyonel hesaplamalar yaparak kişisel hedeflerine uyan seçimler yaptığını varsayar.',
        rational_ex: 'Bu oyunda, ortağınız ne yaparsa yapsın ihanet etmek size daha kısa bir ceza getirir. Sessiz kalırsa, 1 yıl yerine 0 yıl alırsınız. İhanet ederse, 10 yıl yerine 5 yıl alırsınız. Dolayısıyla ihanet etmek her zaman rasyonel ve bencil hamledir.',
        rational_app: 'Şirketlerin reklam yapma veya fiyat düşürme kararları. Biri fiyat düşürürse pazarı ele geçirir; ikisi de yaparsa kârları erir.',
        dominant_t: 'Baskın Strateji (Dominant Strategy)',
        dominant_def: 'Baskın strateji, diğer oyuncuların ne yaptığına bakılmaksızın bir oyuncuya her zaman en yüksek kazancı sağlayan stratejidir.',
        dominant_ex: "Tutsak İkilemi'nde ihanet etmek (itiraf etmek) her iki oyuncu için de baskın stratejidir. Ortağının eyleminden bağımsız olarak, ihanet etmek her zaman iş birliğinden daha iyi sonuç verir.",
        dominant_app: 'Küresel silahsızlanma anlaşmaları. Ülkeler, korunmasız kalmamak için silahsızlanmak (iş birliği) yerine nükleer silahları korumayı (ihanet) tercih ederler.',
        nash_t: 'Nash Dengesi',
        nash_def: 'Nash Dengesi, diğer oyuncuların stratejilerini değiştirmeyeceği varsayımı altında, hiçbir oyuncunun kendi stratejisini tek taraflı olarak değiştirerek kazancını artıramayacağı kararlı durumdur.',
        nash_ex: "İki oyuncu da ihanet ettiğinde (5 yıl / 5 yıl), hiçbiri fikrini değiştirerek kazanç elde edemez. Sessiz kalmaya dönseniz 10 yıl alırsınız. Ortak dönse o alır. Dolayısıyla (İhanet, İhanet) durumu, (Sessiz, Sessiz) her iki taraf için de daha iyi olsa bile kararlı olan Nash Dengesi'dir.",
        nash_app: 'Araç çağırma şirketlerinin fiyat savaşları; her iki taraf da kârı düşürür ve müşterileri kaybetmeden fiyatı tek taraflı artıramaz.',
      },
    },
    chicken: {
      story_title: 'Otoban Düellosu',
      story_1: 'Siz ve rakibiniz dar, tek şeritli bir köprüde yüksek süratle doğrudan birbirinize doğru sürüyorsunuz. Direksiyonu kıran "korkak" damgası yer ve itibarını kaybeder. Düz giden ise zafer kazanır.',
      story_2: 'İkiniz de direksiyonu kırmazsanız kafa kafaya çarpışırsınız. Sonuç ölümcüldür.',
      swerve_btn: 'Direksiyonu Kır',
      swerve_sub: 'Çarpışmayı önle, gururu riske at',
      continue_btn: 'Düz Devam Et',
      continue_sub: 'Rakibe meydan oku',
      driving: 'YÜKSEK HIZDA SÜRÜŞ... İKİ ARAÇ DA KÖPRÜYE YAKLAŞIYOR',
      hold_breath: 'NEFESİNİZİ TUTUN!',
      payoff: 'Kazancınız',
      strategy_analysis: 'Strateji Analizi',
      rival: 'Rakip',
      grid_title: 'Kazanç Tablosu',
      grid_desc: 'Korkak Oyunu kazanç matrisinde tek bir baskın strateji yoktur. Karşılıklı zıtlaşmaya (anti-coordination) yol açar:',
      grid_side: 'Rakibin Seçimi',
      tie: 'Berabere',
      win: 'Galibiyet',
      lose: 'Mağlubiyet',
      crash: 'Çarpışma',
      understand_risk: 'Riski Anlamak',
      outcomes: {
        swerve_t: 'Karşılıklı Kaçınma (Beraberlik) 🐔',
        swerve_d: 'İkiniz de son saniyede direksiyonu kırdınız. Kimse cesur unvanı alamadı ancak ikiniz de hayatta kaldınız.',
        swerve_pay_user: 'Hafif utanç (-1 itibar)',
        swerve_pay_partner: 'Hafif utanç (-1 itibar)',
        swerve_v: 'Güvenli ama vasat. İkiniz de erken pes etmediğiniz için zafer iddia edemiyorsunuz.',
        win_t: 'Tam Zafer! 🏆',
        win_d: 'Diğer sürücü korkuyla direksiyonu kırarken siz düz gittiniz! Cesur ilan edildiniz, o ise "korkak" damgası yedi.',
        win_pay_user: 'Zafer & Saygınlık (+10 itibar)',
        win_pay_partner: 'Rezillik & Alay (-10 itibar)',
        win_v: 'Tehdidiniz inandırıcıydı (ya da yeterince çılgındınız). Bu raundu kazandınız!',
        lose_t: 'Korkak İlan Edildiniz 💔',
        lose_d: 'Hayatta kalmak için direksiyonu kırdınız, diğer sürücü ise düz gitti. Saygınlığı o kazandı, alay konusu siz oldunuz.',
        lose_pay_user: 'Rezillik & Alay (-10 itibar)',
        lose_pay_partner: 'Zafer & Saygınlık (+10 itibar)',
        lose_v: 'Gurur yerine hayatta kalmayı seçtiniz. Rasyonel bir karar, ancak sosyal olarak acı verici.',
        crash_t: 'Ölümcül Çarpışma! 💥',
        crash_d: 'İkiniz de geri adım atmadınız. İki araç da yüksek hızda kafa kafaya çarpıştı. Felaket bir sonuç.',
        crash_pay_user: 'Ağır Yaralanma / Ölüm (-100 değer)',
        crash_pay_partner: 'Ağır Yaralanma / Ölüm (-100 değer)',
        crash_v: "Korkak Oyunu'nun en büyük trajedisi. Gurur, karşılıklı yok oluşa yol açtı.",
      },
      theory: {
        risk_t: 'Risk & Strateji',
        risk_def: 'Risk, bazı alternatiflerin felaketle sonuçlandığı durumlarda belirsizliği tanımlar. Korkak oyununda düz gitmek, rakip kırarsa en büyük kazancı, kırmazsa en kötü sonucu doğurur.',
        risk_ex: 'Eğer "Düz Git"i seçerseniz, rakibin hayata değer verip kaçınacağı üzerine kumar oynarsınız. O da inatçıysa, risk felaketle sonuçlanır.',
        risk_app: 'Finansal piyasalar. Yüksek kaldıraç büyük kârlar sağlar ancak piyasa hafifçe değişirse batışa yol açar.',
        credibility_t: 'Güvenilirlik (Credibility)',
        credibility_def: 'Güvenilirlik, bir tehdit veya vaadin inandırıcılığıdır. Eğer rakibiniz asla direksiyonu kırmayacağınıza inanırsa, hayatta kalmak için kendisi kırmak zorunda kalır.',
        credibility_ex: 'Çılgın veya mantıksız biri olarak tanınıyorsanız, düz gitme tehdidiniz son derece inandırıcıdır. Karşı taraf bunu bildiğinden direksiyonu kıracaktır.',
        credibility_app: 'Jeopolitik müzakereler. Ülkelerin savaşa hazır olduklarını göstermek için askeri tatbikatlar yapıp düşmanı geri adıma zorlaması.',
        threats_t: 'Stratejik Tehditler & Kendini Bağlama',
        threats_def: 'Stratejik tehdit, rakibi belirli bir seçime zorlamak için kendi seçeneklerinizi sınırlandırma eylemidir. Geri adım atma yeteneğinizi devre dışı bırakarak sonucu dikte edersiniz.',
        threats_ex: 'Bu oyunda klasik bir taktik, direksiyon simidini söküp pencereden dışarı atmaktır. Artık rakip sizin kaçınamayacağınızı bilir ve ölmemek için kendisi kaçınmak zorundadır.',
        threats_app: 'Şirketlerin sözleşmelere ağır fesih tazminatları koyarak rakiplerine pazardan çekilemeyeceklerini ilan etmesi.',
      },
    },
    ultimatum: {
      story_title: 'Paylaşım Anlaşması',
      story_1: 'Size 100 dolar verildi. Bu parayı yapay zekalı bir alıcıyla nasıl böleceğinizi teklif etmelisiniz.',
      story_2: 'Alıcı teklifinizi kabul ederse, para tam olarak önerildiği gibi bölünür. Alıcı teklifinizi reddederse, ikiniz de hiçbir şey alamazsınız ($0).',
      keep: 'Size Kalan',
      gets: 'Rakibe Giden',
      submit: 'Teklifi Gönder',
      evaluating: 'Teklif Değerlendiriliyor...',
      evaluating_sub: 'Alıcı teklifin adaletini analiz ediyor.',
      accepted_t: 'Teklif Kabul Edildi!',
      accepted_sub: 'Alıcı teklifinizi kabul edilebilir buldu.',
      rejected_t: 'Teklif Reddedildi!',
      rejected_sub: 'Alıcı paylaşımı adaletsiz bularak reddetti.',
      earnings_user: 'Sizin Nihai Kazancınız',
      earnings_partner: 'AI Nihai Kazancı',
      why_title: 'AI Neden Bu Kararı Verdi?',
      why_accept: 'Alıcı saygı duyulduğunu hissetti. Parasal kazanç gurur eşiğini aştı ve iki tarafın da kazandığı bir alışveriş oldu.',
      why_reject: 'Teklif alıcının onur sınırının altındadır. Düşük teklifinizi cezalandırmak için 100 doları tamamen yakmayı seçti ve ikinizi de $0 ile bıraktı.',
      propose_again: 'Başka Bir Teklif Yap',
      graph_title: 'Kabul Olasılığı Grafiği',
      graph_desc: 'Tarihsel araştırmalar alıcı kabul oranlarının teklif miktarına göre doğrusal olmadığını göstermektedir.',
      offer_under_20: 'Teklif $20 altı',
      offer_20_29: 'Teklif $20 - $29',
      offer_30_39: 'Teklif $30 - $39',
      offer_40_49: 'Teklif $40 - $49',
      offer_50: 'Teklif $50 ve üzeri',
      acceptance: 'Kabul Oranı',
      math_vs_mind: 'Matematik Zihne Karşı',
      theory: {
        fairness_t: 'Adalet & Sosyal Tercihler',
        fairness_def: 'Ekonomide adalet, bireylerin başkalarının refahına değer verdiği ve adaletsizliği cezalandırdığı sosyal tercihleri temsil eder.',
        fairness_ex: "Klasik teori, alıcının $0'dan büyük her teklifi kabul etmesi gerektiğini öngörür ($1, $0'dan iyidir). Ancak gerçekte insanlar, açgözlülüğü cezalandırmak amacıyla $30'ın altındaki teklifleri reddederler.",
        fairness_app: 'Maaş pazarlıkları. Çalışanların adil olmadığını düşündükleri maaş tekliflerini, işsiz kalma pahasına reddetmesi.',
        irrationality_t: 'İnsani Mantıksızlık',
        irrationality_def: 'İnsani mantıksızlık, aktörlerin finansal kazancı her zaman maksimize ettiğini varsayan klasik ekonomik modellerin (homo economicus) tahminlerinden sapmayı ifade eder.',
        irrationality_ex: "100 doların 10 dolarını reddetmek $0 ile kalmak demektir. Finansal olarak bu mantıksızdır, ancak psikolojik olarak adil olmayan birini cezalandırmanın hazzı 10 dolardan büyüktür.",
        irrationality_app: 'Daha ucuz ve pratik olsa bile etik olmayan firmaların ürünlerini boykot etmek.',
        behavioral_t: 'Davranışsal Ekonomi',
        behavioral_def: 'Davranışsal ekonomi, insanların rasyonel mantıktan sapan kararlarını incelemek için psikoloji ve ekonomiyi birleştirir.',
        behavioral_ex: 'Bu oyun, insani ekonomik işlemlerin sadece sayılardan ibaret olmadığını gösterir. Duygusal durumlar, sosyal normlar ve adalet beklentileri kararlara yön verir.',
        behavioral_app: 'İnsanların erteleme eğilimlerini bilerek, emeklilik tasarruf programlarına otomatik katılım (dürtme) tasarlanması.',
      },
    },
    coach: {
      title: 'AI Strateji Koçu',
      sub: 'Hamlelerinize pedagojik geribildirim',
      welcome_msg: 'Merhaba! Ben sizin AI Strateji Koçunuzum. Bir senaryo oynayın, ardından bana sorun: "Kararım neden suboptimaldi?" ya da stratejinizi nasıl geliştireceğinize dair ipuçları isteyin!',
      typing: 'Sorgu değerlendiriliyor...',
      input_placeholder: 'Koça sorun...',
      suggest_suboptimal: 'Kararım neden suboptimaldi?',
      suggest_rational: 'Rasyonel hamle neydi?',
      no_games: 'Henüz bir senaryo oynamış görünmüyorsunuz! Panelden Tutsak İkilemi, Korkak Oyunu veya Ultimatom Oyunu\'nu deneyin. Bir seçim yaptığınızda stratejinizi analiz edebilirim.',
      pd_silent_suboptimal: "Sessiz kalmayı seçtiniz. Tek seferlik Tutsak İkilemi'nde bu hamle suboptimaldir çünkü Sessiz Kalmak kesinlikle elenen (dominated) bir stratejidir. Ortağınız ne yaparsa yapsın, İhanet Etmek size daha iyi sonuç verir. Sessiz kalarak, onun ihanet etmesi durumunda 'Enayi Payı' (10 yıl ceza) alma riskine girdiniz. Ancak tekrarlanan oyunlarda, önce iş birliği yapmak uzun vadeli güven oluşturur.",
      pd_silent_general: 'Sessiz kalmak iş birliğini temsil eder. Soylu bir stratejidir ancak oyun teorisinde sizi savunmasız bırakır. Tek seferlik oyunda ihanet rasyonel dengedir.',
      pd_betray_suboptimal: "İhanet etmeyi seçtiniz. Oyun teorisi açısından bu rasyonel ve 'optimal' seçimdi çünkü İhanet Etmek sizin Baskın Stratejinizdir (ortağın seçiminden bağımsız daha iyi sonuç verir). Ancak iki oyuncu da böyle davrandığında, karşılıklı sessizlikten (1 yıl) daha kötü olan Nash Dengesi'ne (5 yıl ceza) ulaşırsınız. Bu paradoks, bireysel rasyonalitenin kolektif yıkıma yol açabileceğini kanıtlar.",
      pd_betray_general: 'İhanet etmek Nash Dengesi hamlesidir. Kendinizi maksimum cezadan korudunuz ancak karşılıklı iş birliği imkanını yok ettiniz.',
      ch_swerve_suboptimal: "Direksiyonu kırdınız ve 'korkak' ilan edildiniz. Bu suboptimal miydi? Hayatta kalma açısından kesinlikle hayır! Çarpışmak -100 kazanç getirirken direksiyonu kırmak -10 getirir. Son derece makul, riskten kaçınan bir karardır. Ancak oyunu kazanmak istiyorsanız, kırılmayacağınızı karşı tarafa inandırmalısınız. Direksiyonu pencereden atmak gibi kararlı adımlar atarak onu kaçınmaya zorlamalısınız.",
      ch_swerve_general: 'Gurur yerine güvenliği seçtiniz. Rakibi kaçınmaya zorlayacak inandırıcı bir tehdit oluşturamadıysanız direksiyonu kırmak tek mantıklı seçenektir.',
      ch_continue_suboptimal: "Düz gitmeyi seçtiniz. Bu son derece agresif, risk arayan bir harekettir. Sadece rakibinizi kaçınmaya ikna ettiyseniz optimaldir. O da inatçı olsaydı çarpışıp yok olurdunuz. Oyun teorisinde bu strateji 'Stratejik Mantıksızlık' kavramına dayanır (deli taklidi yaparak rakibi kaçınmaya zorlamak).",
      ch_continue_general: 'Düz gitmek büyük bir kumardır. Rakip rasyonel davranıp kaçınırsa kazanırsınız. O da inatçıysa ikiniz de yok olursunuz.',
      ul_suboptimal_low: 'Düşük bir teklif sundunuz. Bu suboptimaldir çünkü insanların adalet tercihleri vardır. Deneylerde $30 altı teklifler %70\'ten fazla reddedilir. Alıcılar sadece sizi cezalandırmak için parayı yakmayı göze alır. Kazancınızı maksimize etmek için teklifi $35-$40 arasında tutmalısınız.',
      ul_suboptimal_high: 'Çok cömert bir teklif sundunuz. Kabul garanti olsa da masada para bıraktığınız için suboptimaldir. $35 veya $40 teklif etseniz de %90+ kabul olasılığınız olacaktı ve kendinize $60+ kalacaktı. Cömertlik güzeldir fakat fayda maksimizasyonu açısından fazlaydı.',
      ul_suboptimal_optimal: 'Harika strateji! $35 ile $45 arası teklif sunmak insanlara karşı en optimal dengedir. Hem adalet eşiklerini aşar hem de size çoğunluk payı ($55-$65) bırakır. Tebrikler!',
      ul_general: 'Paylaşım teklifiniz değerlendirildi. Davranışsal ekonomide bu oyun, insan fayda hesaplarının sadece paradan ibaret olmadığını, onur ve adalet gibi duyguları da barındırdığını kanıtlar.',
      default_reply: 'Oyun teorisi, stratejik etkileşimlerin matematiksel modellerini inceler. Şunu sormayı deneyin: "Son kararım neden bu sonucu doğurdu?" ya da "Baskın strateji nedir?"',
    },
  },
};
