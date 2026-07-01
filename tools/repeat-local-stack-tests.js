#!/usr/bin/env node

import { spawn } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const defaultCommand = 'npm run test:local:stack'
const command = process.env.REPEAT_RUN_COMMAND || defaultCommand
const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const [, , runCountArg, ...extraArgs] = process.argv
const runCount = parseRunCount(runCountArg)

if (!runCount || extraArgs.length > 0) {
  printUsage()
  process.exit(1)
}

console.log(`Running "${command}" ${runCount} time(s).`)

for (let runNumber = 1; runNumber <= runCount; runNumber++) {
  console.log(`Run ${runNumber}/${runCount}: started`)

  const result = await runCommand(command)

  if (result.failed) {
    reportFailure(runNumber, runCount, result)
    process.exit(result.exitCode || 1)
  }

  console.log(`Run ${runNumber}/${runCount}: passed`)
}

console.log(`All ${runCount} run(s) passed.`)

function parseRunCount(value) {
  if (!/^[0-9]+$/.test(value || '')) {
    return null
  }

  const parsed = Number(value)

  if (!Number.isSafeInteger(parsed) || parsed < 1) {
    return null
  }

  return parsed
}

function printUsage() {
  console.error('Usage: node tools/repeat-local-stack-tests.js <runs>')
  console.error('')
  console.error(`Runs "${defaultCommand}" repeatedly until all runs pass.`)
  console.error('Set REPEAT_RUN_COMMAND to override the command.')
}

function runCommand(command) {
  return new Promise((resolve) => {
    const output = []
    let settled = false
    const child = spawn(command, {
      cwd: rootDir,
      env: process.env,
      shell: true,
      stdio: ['ignore', 'pipe', 'pipe']
    })

    child.stdout.on('data', (chunk) => output.push(chunk))
    child.stderr.on('data', (chunk) => output.push(chunk))

    child.on('error', (error) => {
      output.push(Buffer.from(`${error.stack || error.message}\n`))
      settle({
        failed: true,
        exitCode: 1,
        signal: null,
        output
      })
    })

    child.on('close', (exitCode, signal) => {
      settle({
        failed: exitCode !== 0 || signal !== null,
        exitCode,
        signal,
        output
      })
    })

    function settle(result) {
      if (settled) {
        return
      }

      settled = true
      resolve(result)
    }
  })
}

function reportFailure(runNumber, runCount, result) {
  const status = result.signal
    ? `signal ${result.signal}`
    : `exit code ${result.exitCode}`

  console.error(`Run ${runNumber}/${runCount} failed with ${status}.`)
  console.error(`Failing output from run ${runNumber}:`)
  console.error('--- output start ---')

  if (result.output.length === 0) {
    console.error('(no output)')
  } else {
    for (const chunk of result.output) {
      process.stderr.write(chunk)
    }
  }

  console.error('--- output end ---')
}
